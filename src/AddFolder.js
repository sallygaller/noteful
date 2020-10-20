import React from "react";
import StoreContext from "./StoreContext";

class AddFolder extends React.Component {
  static contextType = StoreContext;

  constructor() {
    super();
    this.state = {
      name: "",
      errorMessage: null,
    };
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
    });
    console.log(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { folderName } = e.target;
    const folder = {
      name: this.state.name,
    };
    if (folder.name) {
      fetch(`http://localhost:9090/folders`, {
        method: "POST",
        body: JSON.stringify(folder),
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
          console.log(folderName);
          folderName.value = "";
          this.context.addFolder(data);
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
        errorMessage: "Please ensure the above field is completed.",
      });
    }
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h3 style={{ fontSize: "16px" }}>Add folder</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            onChange={(e) => this.handleChange(e)}
            value={this.state.name}
            type="text"
            name="folderName"
            placeholder="Folder name"
            aria-label="Folder name"
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

export default AddFolder;
