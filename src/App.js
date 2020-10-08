import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import CONTENT from './dummy-store';
import Note from './Note';
import AllFolders from './AllFolders';
import AllNotes from './AllNotes';
import NoteSelection from './NoteSelection';
import FolderSelection from './FolderSelection';

class App extends Component {
  state = {
    store: CONTENT
  }

  render() {
    console.log(this.state.store)
    return (
      <div className="App">
        <header>
          <Link to='/'><h1 >Noteful</h1></Link>
        </header>
        <main>

          <div className="SideBar">
            <AllFolders
              folders={this.state.store.folders} />
          </div>

          <div className="Main">
            <Switch>

              <Route
                exact path="/"
                render={(props) =>
                  <AllNotes
                    notes={this.state.store.notes} />}
              />
              <Route
                path='/folder/:folderId'
                render={(props) =>
                  <NoteSelection
                    note={this.state.store.notes.filter(note => note.folderId === props.match.params.folderId)} />}
              />

              <Route
                path='/note/:noteId'
                render={(props) =>
                  <Note
                    note={this.state.store.notes.find(note => note.id === props.match.params.noteId)}
                  />}
              />
              <Route>
                <h1>No matching routes!</h1>
              </Route>
            </Switch>
          </div>

        </main>
      </div>
    )
  }
}

export default App;


