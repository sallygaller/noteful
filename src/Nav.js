import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav>
      <Link to={"/add-note"}>
        <button type="button" aria-label="Add Note Button">
          Add Note
        </button>
      </Link>
      <Link to={"/add-folder"}>
        <button type="button" aria-label="Add Folder Button">
          Add Folder
        </button>
      </Link>
    </nav>
  );
}
