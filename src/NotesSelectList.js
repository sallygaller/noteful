import React from "react";
import StoreContext from "./StoreContext";
import Note from "./Note";

class NotesSelectList extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = StoreContext;

  render() {
    const getNotesForFolder = (notes = [], folderId) =>
      !folderId ? notes : notes.filter((note) => note.folderId === folderId);
    const { folderId } = this.props.match.params;
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderId);
    return (
      <div>
        <h3>Notes</h3>
        <ul>
          {notesForFolder.map((note) => (
            <li key={note.id}>
              <Note id={note.id} name={note.name} modified={note.modified} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default NotesSelectList;