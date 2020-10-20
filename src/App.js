import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import StoreContext from "./StoreContext";
import Folders from "./Folders";
import NotesSelectList from "./NotesSelectList";
import AddNote from "./AddNote";
import Nav from "./Nav";
import NoteContent from "./NoteContent";
import NotesList from "./NotesList";
import AddFolder from "./AddFolder";
import Error from "./Error";

class App extends Component {
  state = {
    folders: [],
    notes: [],
  };

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  handleAddFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder],
    });
  };

  handleAddNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  componentDidMount() {
    console.log("mounted!");
    Promise.all([
      fetch(`http://localhost:9090/folders`),
      fetch(`http://localhost:9090/notes`),
    ])
      .then(([notesResponse, foldersResponse]) => {
        if (!foldersResponse.ok) {
          console.log("oh no").then((e) => Promise.reject(e));
        }
        if (!notesResponse.ok) {
          console.log("oh no").then((e) => Promise.reject(e));
        }
        return Promise.all([notesResponse.json(), foldersResponse.json()]);
      })
      .then(([folders, notes]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
    };
    return (
      <div>
        <header>
          <div className="App__header">
            <Link to="/">
              <h1>Noteful</h1>
            </Link>
          </div>
        </header>

        <main>
          <StoreContext.Provider value={value}>
            <div className="App">
              <div className="App__nav ">
                <Error>
                  <Folders />
                  <Nav />
                </Error>
              </div>
              <div className="App__main">
                <Switch>
                  <Error>
                    <Route path="/add-folder" component={AddFolder} />
                    <Route path="/add-note" component={AddNote} />
                    <Route exact path="/" component={NotesList} />
                    <Route
                      path="/folder/:folderId"
                      component={NotesSelectList}
                    />
                    <Route path="/note/:noteId" component={NoteContent} />
                    {/* <Route>
                      <h1>No matching routes!</h1>
                    </Route> */}
                  </Error>
                </Switch>
              </div>
            </div>
          </StoreContext.Provider>
        </main>
      </div>
    );
  }
}

export default App;
