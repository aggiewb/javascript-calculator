import React from 'react';

function Display(props){
    return <div id="input-output">
        <input id="display" value={props.operation} disabled></input>
    </div>;
}

export default Display;