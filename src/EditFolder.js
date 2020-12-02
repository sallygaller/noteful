import React from "react";
import PropTypes from "prop-types";
import config from "./config";
import StoreContext from "./StoreContext";
import "./Edit.css";

class EditFolder extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = StoreContext;

  state = {
    id: "",
    title: "",
  };

  componentDidMount() {
    const { folderId } = this.props.match.params;
    fetch(config.API_ENDPOINT_FOLDERS + `/${folderId}`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));
        return res.json();
      })
      .then((responseData) => {
        this.setState({
          id: responseData.id,
          title: responseData.title,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  handleChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { folderId } = this.props.match.params;
    const { id, title } = this.state;
    const newFolder = { id, title };
    fetch(config.API_ENDPOINT_FOLDERS + `/${folderId}`, {
      method: "PATCH",
      body: JSON.stringify(newFolder),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));
      })
      .then(() => {
        this.resetFields(newFolder);
        this.context.updateFolder(newFolder);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };

  resetFields = (newFields) => {
    this.setState({
      id: newFields.id || "",
      title: newFields.title || "",
    });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    const { error, title } = this.state;
    return (
      <section>
        <h2>Edit folder</h2>
        <form onSubmit={this.handleSubmit}>
          <div role="alert">{error && <p>{error.message}</p>}</div>
          <input type="hidden" name="id" />
          <div>
            <label htmlFor="title">Title </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={title}
              onChange={this.handleChangeTitle}
            />
          </div>
          <div className="Group">
            <button type="button" onClick={this.handleClickCancel}>
              Cancel
            </button>{" "}
            <button type="submit">Save</button>
          </div>
        </form>
      </section>
    );
  }
}

export default EditFolder;
