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
    const findNote = (notes = [], noteIdNum) =>
      notes.find((note) => note.id === noteIdNum);
    const { notes = [] } = this.context;
    const { noteId } = this.props.match.params;
    const noteIdNum = parseInt(noteId);
    const note = findNote(notes, noteIdNum) || { content: "" };
    return (
      <div>
        <Note
          id={note.id}
          title={note.title}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <button className="Small_button" type="button" onClick={handleBack}>
          Back
        </button>
      </div>
    );
  }
}

export default NoteContent;
