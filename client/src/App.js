import React from 'react';
import './App.css';
import Numbers from './components/Numbers.js';
import Operators from './components/Operators.js';
import Options from './components/Options.js'
import Footer from './components/Footer.js';

class App extends React.Component {
  constructor(){
    super();
    this.englishNumbers = ["zero", "one", "two", "three", "four", 
                          "five", "six", "seven", "eight", "nine"];
    this.operators = {
      add: "+",
      subtract: "-",
      multiply: "x",
      divide: "/"
    };
    this.options = {
      equals: "=",
      decimal: ".",
      clear: "AC"
    }
  }

  render(){
    return <div>
      <h1>JavaScript Calculator</h1>
      <p>Powered by React</p>
      <section id="calculator">
        <input id="display" disabled></input>
        <Numbers engNums={this.englishNumbers} />
        <Operators operators={this.operators}/>
        <Options options={this.options}/>
      </section>
      <Footer />
    </div>;
  }
}

export default App;