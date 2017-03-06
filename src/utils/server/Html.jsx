import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html lang="en-US">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <meta charSet="utf-8" />

          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />

          <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link
              href={assets.styles[style]}
              key={key}
              media="screen, projection"
              rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}
        </head>
        <body className="theme-openclub">
          <div id="root" dangerouslySetInnerHTML={{__html: content}}/>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__AUTH0_CLIENT_ID=${global.__AUTH0_CLIENT_ID};window.__AUTH0_DOMAIN__=${global.__AUTH0_DOMAIN__};window.__INITIAL_STATE__=${serialize(store.getState())};`}}
                  charSet="UTF-8"/>
          <script src={assets.javascript.vendor} charSet="UTF-8"/>
          <script src={assets.javascript.app} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}