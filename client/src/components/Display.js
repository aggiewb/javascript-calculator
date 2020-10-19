import React from 'react';

function Display(props){
    return <div id="display">
        <input disabled></input>
        <input value={props.currentNum}disabled></input>
    </div>;
}

export default Display;