import React from "react";
import { NavLink } from "react-router-dom";
import StoreContext from "./StoreContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Folders extends React.Component {
  static contextType = StoreContext;

  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
  }

  handleOnClick = (id) => {
    this.setState({
      id,
    });
  };

  render() {
    const { folders = [] } = this.context;
    return (
      <div>
        <h2>Folders</h2>
        <ul>
          <li key="All">
            <NavLink aria-label={"All folders"} to={`/`}>
              <p>All</p>
            </NavLink>
          </li>
          {folders.map((folder) => (
            <li className="Group" key={folder.id}>
              <NavLink
                onClick={() => this.handleOnClick(folder.id)}
                aria-label={folder.title}
                to={`/folder/${folder.id}`}
              >
                <p className={this.state.id === folder.id ? "Active" : ""}>
                  {folder.title}
                </p>
              </NavLink>
              <Link to={`/edit/folder/${folder.id}`}>
                <button
                  type="button"
                  aria-label="Edit Folder Button"
                  className="Button__edit_folder"
                >
                  Edit
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Folders.propTypes = {
  folders: PropTypes.array.isRequired,
};

export default Folders;
