import withStyles from 'isomorphic-style-loader/lib/withStyles';

import flotStyle from './Flot.scss';
import radialStyle from './EasyPieChart.scss';
import rickshawStyle from './Sparkline.scss';

import Flot from './Flot.jsx';
import Radial from './Radial.jsx';
import Rickshaw from './Rickshaw.jsx';

export default {
  Radial: withStyles(flotStyle)(Radial),
  Rickshaw: withStyles(radialStyle)(Rickshaw),
  Flot: withStyles(flotStyle)(Flot)
};
