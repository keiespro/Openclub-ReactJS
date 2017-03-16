import React, { Component, PropTypes, Children } from 'react'
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import { Editor, EditorState, RichUtils } from 'draft-js'
import _ from 'lodash'
import emptyFunction from 'utils/emptyFunction'

class TextEditor extends Component {
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
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ])
  }

  constructor(props) {
    super(props)
    this.state = {editorState: EditorState.createEmpty()};

    this.onBoldClick = this.onBoldClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(editorState) {
    const { name } = this.props;
    this.setState({editorState});
    const content = editorState.getCurrentContent();
    this.props.onChange(name, content.getBlockMap());
  }
  onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  render() {
    const withoutKeys = (object) => _.omit(object, ['children', 'containerClassName']);
    const { name, children } = this.props;
    let label = this.props.label;
    let help = this.props.help;
    let formGroupProps = {};
    let controlLabelProps = {};
    let helpBlockProps = {};
    let containerClassName = '';
    let formControlProps = {
      name,
      onChange: this.onChange,
      editorState: this.state.editorState
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
      });
    }

    return (
      <FormGroup
        controlId={`formcontrol-${name}`}
        {...formGroupProps}
      >
        <ControlLabel {...controlLabelProps}>{label}</ControlLabel>
        <button type="button" onClick={this.onBoldClick}>Bold</button>
        <div className={containerClassName}>
          <Editor {...formControlProps} />
          <HelpBlock {...helpBlockProps}>{help}</HelpBlock>
        </div>
      </FormGroup>
    )
  }
}

export default TextEditor
