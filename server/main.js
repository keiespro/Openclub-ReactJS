const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')

const app = express()
const paths = config.utils_paths

const { useRouterHistory, RouterContext, match } = require('react-router');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { createMemoryHistory, useQueries } = require('history');
const createStore = require('../src/store');
const createRoutes = require('../src/routes');
const AppContainer = require('../src/containers/AppContainer');
const Helmet = require('react-helmet');

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
app.use(require('connect-history-api-fallback')())

let client;
const getReduxPromise = (props, store) => {
  let { query, params } = props
  let comp = props.components[props.components.length - 1].WrappedComponent
  let promise = comp.fetchData ?
    comp.fetchData({ query, params, store, history }) :
    Promise.resolve()
  return promise
}
const subscribeUrl = (history, location) => {
  let currentUrl = location.pathname + location.search
  let unsubscribe = history.listen((newLoc) => {
    if (newLoc.action === 'PUSH' || newLoc.action === 'REPLACE') {
      currentUrl = newLoc.pathname + newLoc.search
    }
  })
  return [
    () => currentUrl,
    unsubscribe
  ]
}

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enable webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : paths.client(),
    hot         : true,
    quiet       : config.compiler_quiet,
    noInfo      : config.compiler_quiet,
    lazy        : false,
    stats       : config.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  client = paths.client('static');
  // app.use(express.static(paths.client('static')))
} else {
  debug('Running in production');

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  console.log(paths);
  // app.use(express.static(paths.dist()))
  client = paths.dist();
}

app.get('*', (req, res, next) => {
  // Primary server-side routing happens here
  let history = useRouterHistory(useQueries(createMemoryHistory))();
  let store = createStore();
  let routes = createRoutes(store, history);
  let location = history.createLocation(req.url);

  match({ routes, location }, (error, redirection, props) => {
    if (redirection) {
      res.redirect(301, redirection.pathname + redirection.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (props == null) {
      res.status(404).send('Not Found');
    } else {
      let [getCurrentUrl, unsubscribe] = subscribeUrl(history, location);
      let reqUrl = location.pathname + location.search;

      getReduxPromise(props, store).then(() => {
        let reduxState = escape(JSON.stringify(store.getState()));
        let html = ReactDOMServer.renderToString(React.createElement(AppContainer, { store, routes }));
        let meta = Helmet.rewind();

        if (getCurrentUrl() === reqUrl) {
          res.render('index', { meta, html, reduxState, client });
        } else {
          res.redirect(302, getCurrentUrl());
        }
        unsubscribe();
      });
    }
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something went wrong.");
});

module.exports = app
