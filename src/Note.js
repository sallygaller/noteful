import React from 'react'

export default function Note(props) {
    console.log(props)
    return (
        <div>
            <h3>{props.note.name}</h3>
            <p>{props.note.content}</p>
        </div>
    )
}
  