import React from 'react';
import { storiesOf } from '@storybook/react';
import Immutable from 'immutable';
import {
  Editor,
  EditorState,
  DefaultDraftBlockRenderMap,
  RichUtils
} from 'draft-js/lib/Draft';

class TestEditor extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { editorState: EditorState.createEmpty() }
    this.onChange = this.onChange.bind(this);
    this.onTab = this.onTab.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  onTab() {
    console.log("TAB EVENT FIRED");
  }

  render() {
    console.log("I HAVE RENDERED");
    return(
      <div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          onTab={this.onTab} />
      </div>
    );
  }
}

let stories = storiesOf('TestEditor', module);
stories.add('test', () => {
  return ( <TestEditor /> );
});
