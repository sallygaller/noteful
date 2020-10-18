import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav>
      <Link to={"/add-note"}>Add Note</Link>
      <Link to={"/add-folder"}>Add Folder</Link>
    </nav>
  );
}
