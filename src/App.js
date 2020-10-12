import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Note from './Note';
import AllFolders from './AllFolders';
import AllNotes from './AllNotes';
import NoteSelection from './NoteSelection';
import NotePage from './NotePage'
import StoreContext from './StoreContext'

class App extends Component {
  state = {
    folders: [],
    notes: []
  }

  handleDeleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
    });
};

  componentDidMount() {
    console.log("mounted!")
    Promise.all([
      fetch(`http://localhost:9090/folders`),
      fetch(`http://localhost:9090/notes`)
    ])
      .then(([notesResponse, foldersResponse]) => {
        if (!foldersResponse.ok) {
          console.log("oh no").then(e => Promise.reject(e))
        }
        if (!notesResponse.ok) {
          console.log("oh no").then(e => Promise.reject(e))
        }
        return Promise.all([notesResponse.json(), foldersResponse.json()])
      })
      .then(([folders, notes]) => {
        this.setState({notes, folders});
      })
      .catch(error => {
        console.error({error})
      })
  }



  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote
    }
    console.log(value)

    return (

      <div className="App">
        <header>
          <Link to='/'><h1 >Noteful</h1></Link>
        </header>
        <main>

          <StoreContext.Provider value={value}>
            <div className="SideBar">
              <AllFolders />
            </div>

            <div className="Main">
              <Switch>

                <Route
                  exact path="/"
                  component={AllNotes}
                // render={(props) =>
                //   <AllNotes
                //     notes={this.state.store.notes} />}
                />
                <Route
                  path='/folder/:folderId'
                  component={NoteSelection}
                // render={(props) =>
                //   <NoteSelection
                //     note={this.state.store.notes.filter(
                //       note => note.folderId === props.match.params.folderId)} 
                //   />}
                />

                <Route path="/note/:noteId" component={NotePage} />
                <Route>
                  <h1>No matching routes!</h1>
                </Route>
              </Switch>
            </div>
          </StoreContext.Provider>
        </main>
      </div>
    )
  }
}

export default App;


