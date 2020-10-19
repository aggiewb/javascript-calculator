import React from 'react';

function Operators(props){
    return <div id="operators">
        {Object.entries(props.operators).map(operator => {
            const [key, sign] = operator;
            return <button key={key} id={key}>{sign}</button>
        })}
    </div>;
}

export default Operators;