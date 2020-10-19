import React from 'react';

function Display(props){
    return <div id="input-output">
        <input disabled></input>
        <input id="display" value={props.currentNum} disabled></input>
    </div>;
}

export default Display;