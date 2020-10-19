import React from 'react';
import './App.css';
import Numbers from './components/Numbers.js'
import Footer from './components/Footer.js';

class App extends React.Component {
  constructor(){
    super();
    this.englishNumbers = ["zero", "one", "two", "three", "four", 
                          "five", "six", "seven", "eight", "nine"];
  }

  render(){
    return <div>
      <h1>JavaScript Calculator</h1>
      <p>Powered by React</p>
      <section id="calculator">
        <Numbers engNums={this.englishNumbers} />
      </section>
      <Footer />
    </div>;
  }
}

export default App;