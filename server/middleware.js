import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from '../src/store';
import createRoutes from '../src/routes';
import renderPage from './render';

export default function(req, res) {
  const memoryHistory = createMemoryHistory();
  const store = createStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = createRoutes(store);

  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      const html = renderPage(store, routes, history);
      res.status(200).send(html);
    } else {
      res.sendStatus(404);
    }
  });
}
