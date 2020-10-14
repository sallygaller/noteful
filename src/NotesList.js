import React from 'react'
import { Link } from 'react-router-dom';
import StoreContext from './StoreContext'
import Note from './Note'

class NotesList extends React.Component {
    static defaultProps = {
        notes: []
    }
    static contextType = StoreContext;
    render() {
        const { notes = [] } = this.context
        return (
            <div>
                <h3>Notes:</h3>
                <ul>
                    {notes.map(note =>
                        <li key={note.id}>
                            <Link
                                to={`/note/${note.id}`}>
                            </Link>
                            <Note
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                            />
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default NotesList
