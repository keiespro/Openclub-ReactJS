import React, { Component, PropTypes, Children, cloneElement } from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import _ from 'lodash';

import emptyFunction from 'utils/emptyFunction'; //eslint-disable-line

class Input extends Component {
  static defaultProps = {
    help: '',
    label: ''
  }
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]),
    label: PropTypes.string,
    help: PropTypes.string,
    validation: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ])
  }
  render() {
    console.log(this.props);
    const withoutKeys = (object) => _.omit(object, ['children', 'containerClassName']);
    const { name, children, value, validation } = this.props;
    let label = this.props.label;
    let help = this.props.help;
    let onChange = this.props.onChange || emptyFunction;
    let formGroupProps = {};
    let formControlProps = {
      name,
      onChange,
      value
    };
    let controlLabelProps = {};
    let helpBlockProps = {};
    let containerClassName = '';

    if (children) {
      Children.forEach(children, (child) => {
        if (child.type === ControlLabel) {
          label = child.props.children;
          controlLabelProps = withoutKeys(_.merge(controlLabelProps, child.props));
        }
        if (child.type === HelpBlock) {
          help = child.props.children;
          helpBlockProps = withoutKeys(_.merge(helpBlockProps, child.props));
        }
        if (child.type === FormControl) {
          if ('containerClassName' in child.props) {
            containerClassName = child.props.containerClassName;
          }
          formControlProps = withoutKeys(_.merge(formControlProps, child.props));
        }
      });

      if (validation) {
        formGroupProps.validationState = validation.type;
        help = validation.message;
      }
    }
    return (
      <FormGroup
        controlId={`formcontrol-${name}`}
        {...formGroupProps}
      >
        <ControlLabel {...controlLabelProps}>{label}</ControlLabel>
        <div className={containerClassName}>
          <FormControl {...formControlProps} />
          <HelpBlock {...helpBlockProps}>{help}</HelpBlock>
        </div>
      </FormGroup>
    );
  }
}

export default Input;
