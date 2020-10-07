import React from 'react'
import { NavLink } from 'react-router-dom';

export default function FolderSelection(props) {
    console.log(props)
    return (
        <div>
            <ul>
                {props.folders.map(folder =>
                <NavLink to={`/folder/${folder.id}`}>
                    <li key={folder.id}>
                        <h3>{folder.name}</h3>
                    </li>
                </NavLink>
                )}
            </ul>
        </div>
    )
}