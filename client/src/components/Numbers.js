import React from 'react';

function Numbers(props){
    return <div>
        {props.engNums.map((num, i) => <button key={num} id={num}>{i}</button>)}
    </div>;
}

export default Numbers;