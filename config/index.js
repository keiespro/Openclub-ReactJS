/* eslint key-spacing:0 spaced-comment:0 */
const { argv } = require('yargs');
const path = require('path');

const config = {
  env: process.env.NODE_ENV || 'development'
}
const CURRENT_WORKING_DIR = process.cwd();

config.globals = (shouldStringify = true) => {

  const st = (val = '') => shouldStringify ? JSON.stringify(val) : val

  return {
    'process.env': {
      'NODE_ENV': st(config.env)
    },
    'NODE_ENV': config.env,
    '__DEV__': st(JSON.parse(config.env === 'development' || 'true')),
    '__PROD__': config.env === 'production',
    '__TEST__': config.env === 'test',
    '__DEBUG__': config.env === 'development' && !argv.no_debug,
    '__DEBUG_NEW_WINDOW__': !!argv.nw,
    '__BASENAME__': st(process.env.BASENAME),
    '__AUTH0_CLIENT_ID__': st(process.env.OCA_AUTH0_CLIENT_ID),
    '__AUTH0_DOMAIN__': st(process.env.OCA_AUTH0_DOMAIN)
  }
};

config.paths = {
  src: path.resolve(CURRENT_WORKING_DIR, 'src'),
  public: 'assets/',
  dist: path.resolve(CURRENT_WORKING_DIR, 'dist'),
  assets: path.resolve(CURRENT_WORKING_DIR, 'dist/public/assets'),
  modules: path.resolve(CURRENT_WORKING_DIR, 'node_modules')
};
console.log(config);

module.exports = config;
