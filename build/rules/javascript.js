const PATHS = require('../paths');

module.exports = ({ production = false, browser = false } = {}) => {
  const enableHotModuleReplacement = !production && browser;
  const createPresets = enableHotModuleReplacement => {
    const presets = ['latest', 'react', 'stage-0'];
    return enableHotModuleReplacement ? ['react-hmre', ...presets] : presets;
  };
  const presets = createPresets(enableHotModuleReplacement);

  const plugins = production ? [
      'transform-runtime',
      'transform-react-remove-prop-types',
      'transform-react-constant-elements',
      'transform-react-inline-elements'
  ] : ['transform-runtime'];

  return {
    test: /\.js$|\.jsx|\.json$/,
    loader: 'babel-loader',
    options: {
      presets,
      plugins
    },
    exclude: PATHS.modules
  };
};
