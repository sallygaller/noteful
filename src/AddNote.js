import React from "react";
import StoreContext from "./StoreContext";
import "./AddNote.css";

class AddNote extends React.Component {
  static contextType = StoreContext;

  constructor() {
    super();
    this.state = {
      name: "",
      content: "",
      folderId: "",
      modified: "",
      errorMessage: null,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      name: this.state.name,
      content: this.state.content,
      folderId: this.state.folderId,
      modified: new Date(),
    };
    if (note.name) {
      fetch(`http://localhost:9090/notes`, {
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
          console.log(note);
          // noteName.value = ''
          // noteContent.value = ''
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
        errorMessage: "Please complete the field",
      });
    }
  };

  render() {
    const { folders = [] } = this.context;
    return (
      <div>
        <h3 style={{ fontSize: "16px" }}> Create note</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            onChange={(e) => this.handleChange(e)}
            value={this.state.name}
            type="text"
            name="name"
            placeholder="Note name"
            aria-label="Note name"
            required
          />
          <label style={{ fontSize: "16px" }}>Select folder</label>
          <select name="folderId" onChange={(e) => this.handleChange(e)}>
            {folders.map((folder) => (
              <option id={folder.id} value={folder.id} name="folderId">
                {folder.name}
              </option>
            ))}
          </select>
          <br />
          <input
            className="Note__Content"
            onChange={(e) => this.handleChange(e)}
            value={this.state.content}
            type="text"
            name="content"
            aria-label="Note content"
            required
          />
          <br />
          <button type="submit" aria-label="Submit button">
            Save
          </button>
          {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : null}
        </form>
      </div>
    );
  }
}

export default AddNote;
