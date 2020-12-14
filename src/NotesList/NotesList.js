import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import StoreContext from "../StoreContext";
import Note from "../Note/Note";
import "./NotesList.css";

class NotesList extends React.Component {
  static defaultProps = {
    notes: [],
  };
  static contextType = StoreContext;
  render() {
    const { notes = [] } = this.context;
    return (
      <div>
        <h2 className="NotesList-h2">Notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Link aria-label={note.title} to={`/note/${note.id}`}></Link>
              <Note
                id={note.id}
                title={note.title}
                modified={note.modified}
                folder_id={note.folder_id}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

NotesList.propTypes = {
  notes: PropTypes.array,
};

export default NotesList;
