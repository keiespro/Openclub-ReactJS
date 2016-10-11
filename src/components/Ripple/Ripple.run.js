import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Ripple.scss'
import Ripple from './Ripple';

function initRipple() {
    $('.ripple').each(function(){
        new Ripple($(this));
    });
}

export default withStyles(s)(initRipple);
