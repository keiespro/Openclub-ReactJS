import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ThemeField.scss';

class ThemeField extends Component {
  static propTypes = {
    input: PropTypes.object
  }
  render() {
    const { input } = this.props;

    const themes = ['default', 'bdazzled_blue', 'coquelicot', 'wine_dregs', 'gun_metal', 'radical_red', 'maximum_blue_green', 'deep_safron', 'golden_gate', 'regi_black', 'pride'];

    return (
      <div className="theme-picker">
        {themes.map((theme, key) => (
          <div
            tabIndex={key + 20}
            role="radio"
            aria-checked={input.value === theme}
            onClick={() => input.onChange(theme)}
            key={theme}
            className={`theme-option oc-theme ${theme}${(input.value || 'default') === theme ? ' selected' : ''}`}
            />
        ))}
      </div>
    )
  }
}
export default ThemeField;
