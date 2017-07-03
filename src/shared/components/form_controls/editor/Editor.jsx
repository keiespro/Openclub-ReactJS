import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Editor as EditorComponent } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Editor extends Component {
  static propTypes = {
    input: PropTypes.object,
    help: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.element
    ])
  }
  constructor(props) {
    super(props);

    this.state = {
      editorState: props.input.value ? EditorState.createWithContent(convertFromHTML(props.input.value)) : null
    }

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.uploadImageCallback = this.uploadImageCallback.bind(this);
  }
  onEditorStateChange(editorState) {
    this.setState({ editorState });

    const rawHtml = convertToHTML(editorState.getCurrentContent());
    this.props.input.onChange(rawHtml);
  }
  uploadImageCallback() {
    // do struff this.potato
    return this.state;
  }
  render() {
    const { editorState } = this.state;
    const { help } = this.props;

    return (
      <div className="oc-editor-component">
        <EditorComponent
          editorState={editorState}
          toolbarClassName="home-toolbar"
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          onEditorStateChange={this.onEditorStateChange}
          uploadCallback={this.uploadImageCallBack}
          />
        <small>{help}</small>
      </div>
    );
  }
}

export default Editor;
