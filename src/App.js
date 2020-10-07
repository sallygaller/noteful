import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import CONTENT from './dummy-store'
import Note from './Note'
import NoteList from './NoteList'

class App extends Component {
  state = {
    store: CONTENT
  }

  setStore = store => {
    this.setState({
      store: CONTENT
    })
  }

  render() {
    console.log(this.state.store)
    return (
      <div className="App">
        <header>
          <Link to='/'><h1 >Noteful</h1></Link>
        </header>
        <main>
          <div className="Group">
            <div className="Sidebar Item">
              <p> Choose a folder: </p>
              <ul>
                {this.state.store.folders.map(folder =>
                  <li key={folder.id}>
                    <Link to={`/folder/${folder.id}`}>
                      {folder.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="Item-double">
              <div className="NoteList">
                <Route
                  path='/folder/:folderId'
                  render={(props) =>
                    <NoteList
                      note={this.state.store.notes.filter(note => note.folderId === props.match.params.folderId)}
                    />}
                />
              </div>

              <div className="Note">
                <Route
                  path='/note/:noteId'
                  render={(props) =>
                    <Note
                      note={this.state.store.notes.find(note => note.id === props.match.params.noteId)}
                    />}
                />
              </div>
            </div>
            </div>
        </main>
      </div>
    )
  }
}

export default App;


