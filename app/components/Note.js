import React from 'react';

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };

    this.edit = this.edit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
  }

  render() {
    if (this.state.editing) {
      return this.renderEdit();
    }
    return this.renderNote();
  }

  renderEdit() {
    return <input type="text"
                  autoFocus={true}
                  placeholder={this.props.task}
                  onBlur={this.finishEdit}
                  onKeyPress={this.checkEnter}/>;
  }

  renderNote() {
    return <div onClick={this.edit}>{this.props.task}</div>;
  }

  edit() {
    this.setState({
      editing: true
    });
  }

  checkEnter(event) {
    if (event.key === 'Enter') {
      this.finishEdit(event);
    }
  }

  finishEdit(event) {
    if (this.props.onEdit){
      this.props.onEdit(event.target.value);
    }
    this.setState({
      editing: false
    });
  }
}