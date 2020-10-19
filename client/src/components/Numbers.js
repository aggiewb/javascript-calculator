import React from 'react';

function Numbers(props){
    const numButtons = props.engNums.reduceRight((accumulator, num, i) => {
        accumulator.push(<button key={num} id={num} onClick={props.concatOperation}>{i}</button>);
        return accumulator;
   }, []);
    return <div id="numbers">
        {numButtons}
    </div>;
}

export default Numbers;