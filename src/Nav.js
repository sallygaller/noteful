import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav(props) {
  return (
    <nav>
      <div className="Group">
        <Link to={"/add-note"}>
          <button
            type="button"
            aria-label="Add Note Button"
            className="Button__add"
          >
            Add Note
          </button>
        </Link>
        <Link to={"/add-folder"}>
          <button
            type="button"
            aria-label="Add Folder Button"
            className="Button__add"
          >
            Add Folder
          </button>
        </Link>
      </div>
    </nav>
  );
}
