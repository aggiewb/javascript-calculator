import React from 'react';
import './App.css';
import Footer from './components/Footer.js';

class App extends React.Component {
  constructor(){
    super();
  }

  render(){
    return <div>
      <h1>JavaScript Calculator</h1>
      <p>Powered by React</p>
      <Footer />
    </div>;
  }
}

export default App;