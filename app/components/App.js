import React from 'react';
import uuid from 'node-uuid';

import NoteList from './NoteList.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn Webpack'
        },
        {
          id: uuid.v4(),
          task: 'Learn React'
        }
      ]
    };
    this.addNote = this.addNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  render() {
    const notes = this.state.notes;
    return (
        <div>
          <button onClick={this.addNote}>Add Note</button>
          <NoteList notes={notes}
                    onEdit={this.editNote}
                    onDelete={this.deleteNote}/>
        </div>
    );
  }

  addNote() {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    });
  }

  editNote(id, task) {
    const notes = this.state.notes.map((note) => {
      if (note.id === id && task) {
        note.task = task;
      }
      return note;
    });
    this.setState({notes});
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== id)
    });
  }
}
