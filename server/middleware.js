import { createMemoryHistory, match } from 'react-router';
import createStore from '../src/store';
import createRoutes from '../src/routes';
import renderPage from './render';

const middleware = assets => (req, res) => {
  const memoryHistory = createMemoryHistory();
  const store = createStore(memoryHistory);
  const routes = createRoutes(store);

  console.log('-=-=-=- Asset List -=-=-=-')
  console.log(assets)

  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err)
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search)
    } else if (props) {
      res.status(200).send(renderPage(store, props, {}, assets))
    } else {
      res.sendStatus(404)
    }
  })
}

export default middleware;
