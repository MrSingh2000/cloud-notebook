import noteContext from "./noteContext";
import { useState } from "react";

// create the note state
const NoteState = (props) => {
  // a global host variable holding the host name
  const host = "http://localhost:5000/";
  // notes array, initially to be empty
  const initialNotes = [];
  // notes state to make changes to the inititalNotes array
  const [notes, setnotes] = useState(initialNotes);
  // function to get all notes stored in db
  const getNotes = async () => {
    let url = `${host}api/notes/fetchnotes`;
    // use fetch api
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3YTUxM2FjYzEwMzZlY2MwOWRmMjVhIn0sImlhdCI6MTYzNTQ5NDEyOX0.8iJL6iFsDxVHzjV28WMdMQRSPYAaOy6l2kTyeDe6EKw"
      },
    });
    const json = await response.json();
    setnotes(json);
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // api calls to add note on db
    let url = `${host}api/notes/addnote`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3YTUxM2FjYzEwMzZlY2MwOWRmMjVhIn0sImlhdCI6MTYzNTQ5NDEyOX0.8iJL6iFsDxVHzjV28WMdMQRSPYAaOy6l2kTyeDe6EKw"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    // changes performed on frontend so that no excess calls are made to fetch all notes
    const newNote = json
    setnotes(notes.concat(newNote));
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // api calls to delete note on db
    let url = `${host}api/notes/deletenote/${id}`;
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3YTUxM2FjYzEwMzZlY2MwOWRmMjVhIn0sImlhdCI6MTYzNTQ5NDEyOX0.8iJL6iFsDxVHzjV28WMdMQRSPYAaOy6l2kTyeDe6EKw"
      }
    });

    // changes performed on frontend so that no excess calls are made to fetch all notes
    const newNotes = notes.filter((note) => note._id !== id);
    setnotes(newNotes);
  }

  // Update a Note
  const editNote = async (id, title, description, tag) => {
    // api call to update a note on db
    let url = `${host}api/notes/updatenote/${id}`;
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3YTUxM2FjYzEwMzZlY2MwOWRmMjVhIn0sImlhdCI6MTYzNTQ5NDEyOX0.8iJL6iFsDxVHzjV28WMdMQRSPYAaOy6l2kTyeDe6EKw"
      },
      body: JSON.stringify({ title, description, tag })
    });
    let json = await response.json();

    // updating the note on the client side
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        setnotes(newNotes);
        break;
      }
    }
  }

  // this is the boiler for creating a context, always same whenever use context
  return (
    // value holds the things needs to be accessed in other components
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;