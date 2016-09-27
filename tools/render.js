/**
 * OpenClub (https://www.openclub.com.au/)
 *
 * Copyright © 2016 OpenClub Holdings, PTY LTD. All Rights Reserved.
 *
 * This source code is proprietary software belonging to OpenClub Holdings PTY LTD
 * and is licensed for use by OpenClub PTY LTD.
 */

import fetch from 'node-fetch';
import runServer from './runServer';
import fs from './lib/fs';
import { host } from '../src/config';

// Enter your paths here which you want to render as static
const routes = [
  '/',
  '/contact',
  '/login',
  '/register',
  '/about',
  '/privacy',
  '/404', // https://help.github.com/articles/creating-a-custom-404-page-for-your-github-pages-site/
];

async function render() {
  let server;
  await new Promise(resolve => (server = runServer(resolve)));

  await routes.reduce((promise, route) => promise.then(async () => {
    const url = `http://${host}${route}`;
    const dir = `build/public${route.replace(/[^\/]*$/, '')}`;
    const name = route.endsWith('/') ? 'index.html' : `${route.match(/[^/]+$/)[0]}.html`;
    const dist = `${dir}${name}`;
    const res = await fetch(url);
    const text = await res.text();
    await fs.makeDir(dir);
    await fs.writeFile(dist, text);
    console.log(`${dist} => ${res.status} ${res.statusText}`);
  }), Promise.resolve());

  server.kill('SIGTERM');
}

export default render;
