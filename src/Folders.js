import React from "react";
import { NavLink } from "react-router-dom";
import StoreContext from "./StoreContext";
import PropTypes from "prop-types";

class Folders extends React.Component {
  static contextType = StoreContext;

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
            <li key={folder.id}>
              <NavLink aria-label={folder.title} to={`/folder/${folder.id}`}>
                <p>{folder.title}</p>
              </NavLink>
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
