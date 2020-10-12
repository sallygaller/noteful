import React from 'react'
import { Link } from 'react-router-dom';
import StoreContext from './StoreContext'

class Note extends React.Component {
    static defaultProps ={
        onDeleteNote: () => {},
      }
      static contextType = StoreContext;
    
      handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id
        console.log(noteId)
    
        fetch(`http://localhost:9090/note/${noteId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
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
          <div className='Note'>
            <h3 className='Note__title'>
              <Link to={`/note/${id}`}>
                {name}
              </Link>
            </h3>
            <button
              className='Note__delete'
              type='button'
              onClick={this.handleClickDelete}
            >
              Delete
            </button>
            <div className='Note__dates'>
              <div className='Note__dates-modified'>
                Modified
                {' '}
                <span className='Date'>
                  {modified}
                </span>
              </div>
            </div>
          </div>
        )
      }
    }
    export default Note;





//     static defaultProps = {
//         match: {
//             params: {}
//         }
//     }

//     static contextType = StoreContext;

//     render() {
//         const { notes=[] } = this.context
//         const { noteId } = this.props.match.params 
//         const findNote = (notes=[], noteId) =>
//             notes.find(note => note.id === noteId)
//         const note = findNote(notes, noteId)
//         const { name, id, modified, content } = this.props
//         console.log(name)
        
//         return (
//             <div>
//                 <button className="back-button" onClick={handleBack}>
//                     Back
//             </button>
//                 <h3>{name}</h3>
//                 <p>Date modified: {modified}</p>
//                 <p>{content}</p>
//                 <button onClick={this.handleDelete}>Delete</button>
//             </div>
//         )
//     }
// }

