
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'teardrop';
import { CodeSplitProvider, createRenderContext } from 'code-split-component';
import { ApolloProvider } from 'react-apollo';
import Helmet from 'react-helmet';
import generateHTML from './generateHTML';
import createStore from '../../../shared/store/create_store';
import apolloClient from '../../../shared/modules/apollo';
import App from '../../../shared/App';
import config from '../../../../config';

/**
 * An express middleware that is capabable of service our React application,
 * supporting server side rendering of the application.
 */
function reactApplicationMiddleware(request, response) {
  // We should have had a nonce provided to us.  See the server/index.js for
  // more information on what this is.
  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }
  const nonce = response.locals.nonce;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (config.disableSSR) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('==> Handling react route without SSR');
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to initialize and render the react application.
    const html = generateHTML({
      // Nonce which allows us to safely declare inline scripts.
      nonce,
    });
    response.status(200).send(html);
    return;
  }

  // First create a context for <ServerRouter>, which will allow us to
  // query for the results of the render.
  const reactRouterContext = createServerRenderContext();

  // We also create a context for our <CodeSplitProvider> which will allow us
  // to query which chunks/modules were used during the render process.
  const codeSplitContext = createRenderContext();

  // Setup redux
  const store = createStore();

  // Create our React application and render it into a string.
  const reactAppString = renderToString(
    <CodeSplitProvider context={codeSplitContext}>
      <ApolloProvider store={store} client={apolloClient}>
        <ServerRouter location={request.url} context={reactRouterContext}>
          <App store={store} />
        </ServerRouter>
      </ApolloProvider>
    </CodeSplitProvider>,
  );

  const env_vars = {
    'AUTH0_CLIENT_ID': process.env.AUTH0_CLIENT_ID,
    'AUTH0_DOMAIN': process.env.AUTH0_DOMAIN,
    'GRAPH_URL': process.env.GRAPH_URL,
    'ICEPICK_URL': process.env.ICEPICK_URL,
    'STREAM_APP_ID': process.env.STREAM_APP_ID,
    'STREAM_API_KEY': process.env.STREAM_API_KEY
  }

  // Generate the html response.
  const html = generateHTML({
    // Provide the full app react element.
    reactAppString,
    // Nonce which allows us to safely declare inline scripts.
    nonce,
    env_vars,
    // Running this gets all the helmet properties (e.g. headers/scripts/title etc)
    // that need to be included within our html.  It's based on the rendered app.
    // @see https://github.com/nfl/react-helmet
    helmet: Helmet.rewind(),
    // We provide our code split state so that it can be included within the
    // html, and then the client bundle can use this data to know which chunks/
    // modules need to be rehydrated prior to the application being rendered.
    codeSplitState: codeSplitContext.getState(),
    initialState: store.getState()
  });

  // Get the render result from the server render context.
  const renderResult = reactRouterContext.getResult();

  // Check if the render result contains a redirect, if so we need to set
  // the specific status and redirect header and end the response.
  if (renderResult.redirect) {
    response.status(301).setHeader('Location', renderResult.redirect.pathname);
    response.end();
    return;
  }

  response
    .status(
      renderResult.missed
        // If the renderResult contains a "missed" match then we set a 404 code.
        // Our App component will handle the rendering of an Error404 view.
        ? 404
        // Otherwise everything is all good and we send a 200 OK status.
        : 200,
    )
    .send(html);
}

export default (reactApplicationMiddleware);
