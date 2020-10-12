import React from 'react'
import { Link } from 'react-router-dom'
import Note from './Note'
import StoreContext from './StoreContext'


export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = StoreContext

  render() {
    const getNotesForFolder = (notes=[], folderId) => (
        (!folderId)
          ? notes
          : notes.filter(note => note.folderId === folderId)
      )
    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
        </div>
      </section>
    )
  }
}