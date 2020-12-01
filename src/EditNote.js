import React from "react";
import PropTypes from "prop-types";
import config from "./config";
import StoreContext from "./StoreContext";

class EditNote extends React.Component {
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
    error: null,
    id: "",
    title: "",
    content: "",
  };

  componentDidMount() {
    const { noteId } = this.props.match.params;
    fetch(config.API_ENDPOINT_NOTES + `/${noteId}`, {
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
          content: responseData.content,
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

  handleChangeContent = (e) => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { noteId } = this.props.match.params;
    const { id, title, content } = this.state;
    const newNote = { id, title, content };
    fetch(config.API_ENDPOINT_NOTES + `/${noteId}`, {
      method: "PATCH",
      body: JSON.stringify(newNote),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));
      })
      .then(() => {
        this.resetFields(newNote);
        this.context.updateNote(newNote);
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
      content: newFields.content || "",
    });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    const { error, title, content } = this.state;
    return (
      <section>
        <h2>Edit note</h2>
        <form onSubmit={this.handleSubmit}>
          <div role="alert">{error && <p>{error.message}</p>}</div>
          <input type="hidden" name="id" />
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={title}
              onChange={this.handleChangeTitle}
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              id="content"
              value={content}
              onChange={this.handleChangeContent}
            />
          </div>
          <div>
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

export default EditNote;
