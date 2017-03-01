import React, { Component, PropTypes, Children } from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { DateField, DatePicker } from 'react-date-picker';
import _ from 'lodash';

import './styles/DateField.scss';

class DateFieldInput extends Component {
  static contextTypes = {
    handleChange: PropTypes.func,
    getState: PropTypes.func,
    validateField: PropTypes.func
  }
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
    validations: PropTypes.array,
    name: PropTypes.string.isRequired
  }
  render() {
    const withoutKeys = (object) => _.omit(object, ['children', 'containerClassName']);
    const { name, children, validations } = this.props;
    const value = this.context.getState(name);
    const validation = validations ? this.context.validateField(name, validations) : null;
    let label = this.props.label;
    let help = this.props.help;
    let formGroupProps = {};
    let controlLabelProps = {};
    let helpBlockProps = {};
    let containerClassName = '';
    let formControlProps = {
      forceValidDate: true,
      dateFormat: 'DD/MM/YYYY',
      onChange: this.context.handleChange.bind(this, name),
      date: value || new Date(),
      updateOnDateClick: true,
      collapseOnDateClick: true,
      showClock: false,
    };

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
    }

    if (validation) {
      formGroupProps.validationState = validation.type;
      help = validation.message;
    }

    return (
      <FormGroup
        controlId={`formcontrol-${name}`}
        {...formGroupProps}
      >
        <ControlLabel {...controlLabelProps}>{label}</ControlLabel>
        <div className={containerClassName}>
          <DateField {...formControlProps}>
            <DatePicker
              navigation
              locale="en"
              forceValidDate
              highlightWeekends
              highlightToday
              weekNumbers
              weekStartDay={0}
            />
          </DateField>
          <HelpBlock {...helpBlockProps}>{help}</HelpBlock>
        </div>
      </FormGroup>
    );
  }
}

export default DateFieldInput;
