import React from 'react'


export default function Note(props) {
    console.log(props)
    return (
        <div>
            <button className="back-button">
                Back
            </button>
            <h3>{props.note.name}</h3>
            <p>Date modified: {props.note.modified}</p>
            <p>{props.note.content}</p>
        </div>
    )
}

