import fs from 'fs';
import path from 'path';

const CWD = process.cwd();
const ASSET_PATH = path.resolve(CWD, 'dist/assets.json');

async function getAssets() {
  try {
    if (await fs.exists(ASSET_PATH)) {
      const file = await fs.readFile(ASSET_PATH);
      return JSON.parse(file);
    }
    return false;
  } catch (err) {
    console.error(err)
  }
}

function createAnalyticsSnippet(id) {
  return `<script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', '${id}', 'auto');
  ga('send', 'pageview');
  </script>
  <script async src='https://www.google-analytics.com/analytics.js'></script>`;
}

async function createAppScript() {
  const assets = await getAssets();
  if (assets === false) return `<!-- SCRIPTS PENDING -->`;
  return `
  <script type="text/javascript" charset="utf-8" src="${assets.vendor.js}"></script>
  <script type="text/javascript" charset="utf-8" src="${assets.app.js}"></script>
  `;
}

const createTrackingScript = () => 'ANALYTICS_ID' in process.env ? createAnalyticsSnippet(process.env.ANALYTICS_ID) : '';

export { createTrackingScript, createAppScript };
