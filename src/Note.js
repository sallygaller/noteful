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
        <h3 style={{ fontSize: "16px" }}>
          <Link to={`/note/${id}`}>{name}</Link>
        </h3>
        Date Modified: {modified}
        <br />
        <button type="button" onClick={this.handleClickDelete}>
          Delete
        </button>
      </div>
    );
  }
}

export default Note;

Note.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
};
