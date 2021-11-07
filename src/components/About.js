import React, { useContext } from 'react';
// import noteState from '../context/noteState';
import noteContext from '../context/noteContext';


export default function About() {
    let a = useContext(noteContext);
    console.log(a);

    return (
        <div>
            This is about {a.state.name} and in class {a.state.class}
        </div>
    )
}
