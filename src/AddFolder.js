import React from 'react'
import StoreContext from './StoreContext'

class AddFolder extends React.Component {
    static contextType = StoreContext;

    constructor() {
        super()
        this.state = {
            name: "",
            error: null
        }
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        })
        console.log(this.state)
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const { folderName } = e.target
        const folder = {
            name: this.state.name
        }
        this.setState({ error: null })
        console.log("fetching data...")
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            body: JSON.stringify(folder),
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
            console.log(folderName)
            folderName.value = ''
            this.context.addFolder(data)
            this.props.history.push('/')
        })
        .catch(error => {
            this.setState({ 
                error: {error} })
        })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    render() {
        const { error } = this.state
        return (
            <div>
                <h3>Add folder:</h3>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        value={this.state.name}
                        type="text"
                        name="folderName"
                        placeholder="Folder name"
                        aria-label="Folder name"
                        required
                    />
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
                    <div role="alert">
                        {error && <p>{error.message}</p>}
                    </div>
                </form>
            </div>
        )
    }
}

export default AddFolder;