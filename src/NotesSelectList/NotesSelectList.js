import React from "react";
import StoreContext from "../StoreContext";
import Note from "../Note/Note";
import "./NotesSelectList.css";

class NotesSelectList extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = StoreContext;

  render() {
    const getNotesForFolder = (notes = [], folderIdNum) =>
      !folderIdNum
        ? notes
        : notes.filter((note) => note.folder_id === folderIdNum);
    const { folderId } = this.props.match.params;
    const folderIdNum = parseInt(folderId);
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderIdNum);
    return (
      <div>
        <h2 className="NotesSelectList-h2">Notes</h2>
        <ul>
          {notesForFolder.map((note) => (
            <li key={note.id}>
              <Note
                aria-label={note.title}
                id={note.id}
                title={note.title}
                modified={note.modified}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default NotesSelectList;
