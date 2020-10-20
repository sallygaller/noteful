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
        <h3>Folders</h3>
        <ul>
          <NavLink to={`/`}>
            <li key="All">
              <p>All</p>
            </li>
          </NavLink>
          {folders.map((folder) => (
            <NavLink to={`/folder/${folder.id}`}>
              {console.log(NavLink)}
              <li key={folder.id}>
                <p>{folder.name}</p>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    );
  }
}

Folders.propTypes = {
  folders: PropTypes.array,
};

export default Folders;
