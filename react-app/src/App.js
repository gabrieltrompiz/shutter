import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
// import Header from './components/Header';
import LoginView from  './views/LoginView'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedIn: false }
  }

  render() {
    return (
      <div className="App">
        <LoginView loggedIn={this.state.loggedIn}/>
      </div>
    );
  }
}

export default App;
