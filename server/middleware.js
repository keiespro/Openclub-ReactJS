import { createMemoryHistory, match } from 'react-router';
import createStore from '../src/store';
import createRoutes from '../src/routes';
import renderPage from './render';

function middleware(req, res) {
  const memoryHistory = createMemoryHistory();
  const store = createStore(memoryHistory);
  const routes = createRoutes(store);

  async function getHtml(store, props, cb) {
    cb(await renderPage(store, props));
  }

  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      getHtml(store, props, (cb) => {
        res.status(200).send(cb);
      });
    } else {
      res.sendStatus(404);
    }
  });
}

export default middleware;
