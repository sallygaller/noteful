import React from 'react'
import { Link } from 'react-router-dom';
import StoreContext from './StoreContext'

class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => { },
  }
  static contextType = StoreContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok)
          return response.json().then(e => Promise.reject(e))
        return response.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, modified } = this.props
    return (
      <div>
        <h3>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h3>
        <button
          type='button'
          onClick={this.handleClickDelete}
        >
          Delete
        </button>
        Date Modified:{' '}{modified}
      </div>
    )
  }
}
export default Note;