import React from "react";
import PropTypes from "prop-types";
import config from "../config";
import StoreContext from "../StoreContext";
import "./AddFolder.css";

class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = StoreContext;

  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = e.target;
    const folder = {
      title: title.value,
    };
    this.setState({ error: null });
    if (folder.title) {
      fetch(config.API_ENDPOINT_FOLDERS, {
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
        <h3 className="AddFolder-h3">Add Folder</h3>
        <form className="AddFolder-form" onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            name="title"
            placeholder="Folder name"
            aria-label="Folder name"
            className="AddFolder-input"
            required
          />
          <div className="group">
            <button
              className="AddFolder-button"
              type="submit"
              aria-label="Submit button"
            >
              Save
            </button>
            <button
              className="AddFolder-button"
              type="button"
              onClick={this.handleClickCancel}
              aria-label="Cancel button"
            >
              Cancel
            </button>
          </div>
          {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : null}
        </form>
      </div>
    );
  }
}

export default AddFolder;
