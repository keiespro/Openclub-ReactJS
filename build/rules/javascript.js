const PATHS = require('../paths');

module.exports = ({ production = false, browser = false } = {}) => {
  const createPresets = enableHotModuleReplacement => {
    const presets = [["latest", {"modules": false}], 'react', 'stage-0'];
    return enableHotModuleReplacement ? ['react-hmre', ...presets] : presets;
  };
  const createPlugins = enableHotModuleReplacement => {
    const plugins = ['transform-runtime', 'transform-react-remove-prop-types', 'transform-react-constant-elements', 'transform-react-inline-elements'];
    return enableHotModuleReplacement ? ['react-hot-loader/babel', ...plugins] : plugins;
  }
  const presets = createPresets(!production && browser);
  const plugins = createPlugins(!production && browser);

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
