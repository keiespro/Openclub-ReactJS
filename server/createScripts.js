function createAnalyticsSnippet(id) {
  return `<script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', '${id}', 'auto');
  ga('send', 'pageview');
  </script>
  <script async src='https://www.google-analytics.com/analytics.js'></script>`;
}

const createAppScript = assets => assets.app.concat(assets.vendor)
  .filter(path => path.endsWith('.js'))
  .reverse().map(path => `<script type="text/javascript" charset="utf-8" src="/assets/${path}"></script>`)

const createTrackingScript = () => 'ANALYTICS_ID' in process.env ? createAnalyticsSnippet(process.env.ANALYTICS_ID) : '';

export { createTrackingScript, createAppScript };
