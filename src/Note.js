import React from 'react'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function handleBack() {
    history.goBack();
}

export default function Note(props) {
    console.log(props)
    return (
        <div>
            <button className="back-button" onClick={handleBack}>
                Back
            </button>
            <h3>{props.note.name}</h3>
            <p>Date modified: {props.note.modified}</p>
            <p>{props.note.content}</p>
        </div>
    )
}

