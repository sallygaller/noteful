import React from 'react'
import { Link } from 'react-router-dom';
import StoreContext from './StoreContext'

class AllNotes extends React.Component {
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
}

export default AllNotes
