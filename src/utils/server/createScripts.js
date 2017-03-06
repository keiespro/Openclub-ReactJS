import debugCreator from 'debug'

const debug = debugCreator('server:createScripts')

function createAnalyticsSnippet(id) {
  return `<script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', '${id}', 'auto');
  ga('send', 'pageview');
  </script>
  <script async src='https://www.google-analytics.com/analytics.js'></script>`;
}

const createAppScript = assets => assets
.map(path => `<script type="text/javascript" charset="utf-8" src="${path}"></script>`)
.join('')

const createTrackingScript = () => 'ANALYTICS_ID' in process.env ? createAnalyticsSnippet(process.env.ANALYTICS_ID) : '';

export { createTrackingScript, createAppScript };
