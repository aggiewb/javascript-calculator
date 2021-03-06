import React from 'react';
import './App.css';
import Display from './components/Display.js';
import Numbers from './components/Numbers.js';
import Operators from './components/Operators.js';
import Options from './components/Options.js'
import Footer from './components/Footer.js';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      operation: '0',
      result: 0,
      hasResult: false
    }
    this.clear = this.clear.bind(this);
    this.concatOperation = this.concatOperation.bind(this);
    this.concatDecimal = this.concatDecimal.bind(this);
    this.computeOperation = this.computeOperation.bind(this);
  }

  englishNumbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  operators = {
    add: "+",
    subtract: "-",
    multiply: "x",
    divide: "/"
  };
  options = {
    clear: "AC",
    decimal: ".",
    equals: "="
  };

  concatOperation(event){
    this.setState({hasResult: false});
    const input = event.target.textContent;
    const regex = new RegExp('[+/x-]');
    const isInitialOperation = this.state.operation === "0";
    if(input.match(regex) && isInitialOperation){
      return;
    }
    const operation = isInitialOperation ? input : this.state.operation + input;
    this.setState({operation});
  }
  
  concatDecimal(){
    const lastOperationIndex = this.state.operation.length - 1;
    const regex = new RegExp('[+/x-]');
    let lastNumString;
    for(let i = lastOperationIndex; i >= 0; i--){
      if(this.state.operation[i].match(regex)){
        lastNumString = this.state.operation.substring(i + 1);
        break;
      } else if(i === 0){
        lastNumString = this.state.operation.substring(0);
      }
    }
    const lastInput = this.state.operation[lastOperationIndex];
    if(!lastInput.match(regex) && !lastNumString.match(/\./)){
      const operation = this.state.operation + '.';
      this.setState({operation});
    }
  }

  computeOperation(){
    const regex = new RegExp('[+/x-]+', 'g');
    const numStrArr = this.state.operation.split(regex);
    const numArr = numStrArr.map(num => parseFloat(num));
    const operatorsArr = this.state.operation.match(regex);
    
    let result = numArr[0];
    const operations = {
      "+": (num) => result + num,
      "-": (num) => result - num,
      "x": (num) => result * num,
      "/": (num) => result / num,
    };
    for(let i = 1; i < numStrArr.length; i++){
      let operator = operatorsArr[i - 1];
      let num = numArr[i];
      if(operator.length > 1){
        let operatorLength = operator.length;
        if(operator[operatorLength - 1] === '-'){
          num *= -1;
          operator = operator[operatorLength - 2];
        } else {
          operator = operator[operatorLength - 1]
        }
      }
      result = operations[operator](num);
    }
    this.setState({result, hasResult: true, operation: `${result}`});
  }

  clear(){
    this.setState({
      operation: '0',
      result: 0,
      hasResult: false
    });
  }

  render(){
    return <div>
      <h1>JavaScript Calculator</h1>
      <p>Powered by React</p>
      <Display hasResult={this.state.hasResult} result={this.state.result} operation={this.state.operation}/>
      <section id="calculator">
        <Numbers engNums={this.englishNumbers} concatOperation={this.concatOperation}/>
        <Options options={this.options} clear={this.clear} concatDecimal={this.concatDecimal} equals={this.computeOperation}/>
        <Operators operators={this.operators} concatOperation={this.concatOperation}/>
      </section>
      <Footer />
    </div>;
  }
}

export default App;