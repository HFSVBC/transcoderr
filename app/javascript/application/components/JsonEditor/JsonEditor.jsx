import React, {Component} from 'react';
import JSONEditor from 'jsoneditor';

class JsonEditor extends Component {
  componentDidMount () {
    const options = {
      mode: 'tree',
      onChangeJSON: this.props.onChange
    };

    this.jsoneditor = new JSONEditor(this.container, options);
    this.jsoneditor.set(this.props.value);
  }

  componentWillUnmount () {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  componentDidUpdate() {
    this.jsoneditor.update(this.props.value);
  }

  render() {
    return (
      <div className="jsoneditor-react-container" ref={elem => this.container = elem} />
    )
  }
}

export default JsonEditor;
