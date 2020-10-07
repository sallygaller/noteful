import React from 'react'
import { Route, Link } from 'react-router-dom';

export default function NoteList(props) {
    console.log(props)
    return (
        <div>
            <ul>
                {props.note.map(note =>
                    <li key={note.id}>
                        <Link to={`/note/${note.id}`}>
                            {note.name}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}
