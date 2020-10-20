import React from 'react';

function Options(props){
    return <div id="options">
        {Object.entries(props.options).map(option => {
            const [key, sign] = option;
            let callback;
            if(key === 'clear'){
                callback = props.clear;
            } else if(key === 'decimal'){
                callback = props.concatDecimal;
            } else if(key === 'equals'){
                callback = props.equals;
            }
            return <button key={key} id={key} onClick={callback}>{sign}</button>;
        })}
    </div>;
}

export default Options;