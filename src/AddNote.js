import React from "react";
import PropTypes from "prop-types";
import StoreContext from "./StoreContext";
import "./AddNote.css";
import config from "./config";

class AddNote extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = StoreContext;

  state = {
    error: null,
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, folderId } = e.target;
    const note = {
      title: title.value,
      content: content.value,
      folder_id: Number(folderId.value),
      modified: new Date(),
    };
    if (note.title) {
      fetch(config.API_ENDPOINT_NOTES, {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((error) => {
              throw error;
            });
          }
          return res.json();
        })
        .then((data) => {
          this.context.addNote(data);
          this.props.history.push("/");
        })
        .catch((error) => {
          this.setState({
            errorMessage: "Something went wrong! Please try again.",
          });
          console.log("Error: ", { error });
        });
    } else {
      this.setState({
        errorMessage: "Please ensure the above fields are completed.",
      });
    }
  };

  render() {
    const { folders = [] } = this.context;
    return (
      <div>
        <h3 style={{ fontSize: "16px" }}> Add note:</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            name="title"
            placeholder="Note name"
            aria-label="Note name"
            required
          />
          <label style={{ fontSize: "16px" }}>Select folder</label>
          <select name="folderId">
            {folders.map((folder) => (
              <option id={folder.id} value={folder.id} name="folder_id">
                {folder.title}
              </option>
            ))}
          </select>
          <br />
          <input
            className="Note__Content"
            type="text"
            name="content"
            aria-label="Note content"
            required
          />
          <br />
          <button type="submit" aria-label="Submit button">
            Save
          </button>
          <button
            type="button"
            onClick={this.handleClickCancel}
            aria-label="Cancel button"
          >
            Cancel
          </button>
          {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : null}
        </form>
      </div>
    );
  }
}

export default AddNote;
