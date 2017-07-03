import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Editor as EditorComponent, EditorState, ContentState, convertToRaw } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

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
      editorState: false
    }

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.uploadImageCallback = this.uploadImageCallback.bind(this);
  }
  componentWillMount() {
    const { input } = this.props;

    const blocksFromHtml = htmlToDraft(input.value);
    const contentBlocks = blocksFromHtml.contentBlocks;
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    const editorState = EditorState.createWithContent(contentState);

    this.setState({ editorState });
  }
  onEditorStateChange(editorState) {
    this.setState({ editorState });

    const contentState = convertToRaw(editorState.getCurrentContent());
    this.props.input.onChange(draftToHtml(contentState));
  }
  uploadImageCallBack() {
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
