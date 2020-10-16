import React from 'react'
import StoreContext from './StoreContext'

class AddNote extends React.Component {
    static contextType = StoreContext;

    constructor() {
        super()
        this.state = {
            name: "",
            content: "",
            folderId: "",
            modified: "",
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const note = {
            name: this.state.name,
            content: this.state.content,
            folderId: this.state.folderId,
            modified: new Date()
        }
        console.log(note)
        console.log("fetching data...")
        fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                return res.json()
            })
            .then(data => {
                console.log(note)
                // noteName.value = ''
                // noteContent.value = ''
                this.context.addNote(data)
                this.props.history.push('/')
            })
            .catch(error => {
                console.log("oh no")
            })
    }

    render() {
        const { folders = [] } = this.context
        return (
            <div>
                <h3>Add Note:</h3>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        value={this.state.name}
                        type="text"
                        name="name"
                        placeholder="Note name"
                        aria-label="Note name"
                        required
                    />
                    <input
                        onChange={(e) => this.handleChange(e)}
                        value={this.state.content}
                        type="text"
                        name="content"
                        placeholder="Note"
                        aria-label="Note content"
                        required
                    />
                    <label>Select folder:</label>
                    <select 
                        name="folderId" 
                        onChange={(e) => this.handleChange(e)}
                        >
                        {folders.map(folder =>
                            <option
                                id={folder.id}
                                value={folder.id}
                                name="folderId">
                                {folder.name}
                            </option>
                        )}
                    </select>
                    <button
                        type="button"
                        onClick={this.handleClickCancel}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        aria-label="Submit button">
                        Save
                    </button>
                </form>
            </div>
        )
    }
}

export default AddNote;