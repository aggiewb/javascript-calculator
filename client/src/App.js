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
      total: 0,
      hasTotal: false
    }
    this.clear = this.clear.bind(this);
    this.concatOperation = this.concatOperation.bind(this);
    this.concatDecimal = this.concatDecimal.bind(this);
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
    const input = event.target.textContent;
    const operation = this.state.operation === "0" ? input : this.state.operation + input;
    this.setState({operation});
  }
  
  //TODO: If current number contains a decimal, do not add others.
  concatDecimal(){
    const lastInput = this.state.operation[this.state.operation.length - 1];
    const regex = new RegExp('[.+/x-]');
    if(!lastInput.match(regex)){
      const operation = this.state.operation + '.';
      this.setState({operation});
    }
  }

  clear(){
    this.setState({
      operation: '0',
      total: 0,
      hasTotal: false
    });
  }

  render(){
    return <div>
      <h1>JavaScript Calculator</h1>
      <p>Powered by React</p>
      <Display hasTotal={this.state.hasTotal} total={this.state.total} operation={this.state.operation}/>
      <section id="calculator">
        <Numbers engNums={this.englishNumbers} concatOperation={this.concatOperation}/>
        <Options options={this.options} clear={this.clear} concatDecimal={this.concatDecimal}/>
        <Operators operators={this.operators} concatOperation={this.concatOperation}/>
      </section>
      <Footer />
    </div>;
  }
}

export default App;