import React from "react";
import Note from "./Note";
import StoreContext from "./StoreContext";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
function handleBack() {
  history.goBack();
}

class NoteContent extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = StoreContext;

  handleDeleteNote = (noteId) => {
    this.props.history.push(`/`);
  };

  render() {
    const findNote = (notes = [], noteId) =>
      notes.find((note) => note.id === noteId);
    const { notes = [] } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || { content: "" };
    return (
      <div>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <button type="button" onClick={handleBack}>
          Back
        </button>
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default NoteContent;
