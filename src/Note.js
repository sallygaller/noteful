import React from "react";
import { Link } from "react-router-dom";
import StoreContext from "./StoreContext";
import PropTypes from "prop-types";
import "./Note.css";

class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  };
  static contextType = StoreContext;

  handleClickDelete = (e) => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) return response.json().then((e) => Promise.reject(e));
        return response.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        this.props.onDeleteNote(noteId);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { name, id, modified } = this.props;
    return (
      <div>
        <p style={{ fontSize: "16px" }}>
          <Link aria-label={name} to={`/note/${id}`}>
            {name}
          </Link>
        </p>
        Date Modified: {modified}
        <br />
        <button
          aria-label="Delete button"
          type="button"
          onClick={this.handleClickDelete}
        >
          Delete
        </button>
      </div>
    );
  }
}

Note.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
};

export default Note;
