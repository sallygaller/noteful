import React from 'react'
import { Link } from 'react-router-dom';

export default function AllNotes(props) {
    console.log(props)
    return (
        <div>
            <h3>Notes:</h3>
            <ul>
                {props.notes.map(note =>
                    <li key={note.id}>
                        <Link to={`/note/${note.id}`}>
                            <h3>{note.name}</h3>
                        </Link>
                        <p>Date modified: {note.modified}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}