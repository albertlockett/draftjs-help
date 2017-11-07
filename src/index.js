import React from 'react';
import { storiesOf } from '@storybook/react';
import Immutable from 'immutable';
import {
  Editor,
  EditorState,
  DefaultDraftBlockRenderMap,
  RichUtils
} from 'draft-js';

class MyCustomBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='MyCustomBlock'>
        {this.props.children}
      </div>
    );
  }
}

const blockRenderMap = Immutable.Map({
  'MyCustomBlock': {
    element: 'h1',
    wrapper: MyCustomBlock,
  }
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);


class TestEditor extends React.Component {


  constructor(props, context) {
    super(props, context);
    this.state = { editorState: EditorState.createEmpty() }
    this.makeCustom = this.makeCustom.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  makeCustom() {
    const blockType = 'MyCustomBlock';
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  render() {
    return(
      <div>
        <button onClick={this.makeCustom}>Click</button>
        <Editor
          blockRenderMap={extendedBlockRenderMap}
          editorState={this.state.editorState}
          onChange={this.onChange} />
      </div>
    );
  }
}

let stories = storiesOf('TestEditor', module);
stories.add('test', () => {
  return ( <TestEditor /> );
});
