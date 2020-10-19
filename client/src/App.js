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
    this.state ={
      currentNum: 0,
      total: 0,
      operation: ''
    }
    this.clear = this.clear.bind(this);
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

  clear(){
    this.setState({
      currentNum: 0,
      total: 0,
      operator: ''
    });
  }

  render(){
    return <div>
      <h1>JavaScript Calculator</h1>
      <p>Powered by React</p>
      <Display currentNum={this.state.currentNum} operator={this.state.operator}/>
      <section id="calculator">
        <Numbers engNums={this.englishNumbers} />
        <Options options={this.options} clear={this.clear}/>
        <Operators operators={this.operators}/>
      </section>
      <Footer />
    </div>;
  }
}

export default App;