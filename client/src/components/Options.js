import React from 'react';

function Options(props){
    return <div>
        {Object.entries(props.options).map(option => {
            const [key, sign] = option;
            return <button key={key} id={key}>{sign}</button>;
        })}
    </div>;
}

export default Options;