import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
// import Header from './components/Header';
import LoginView from './views/LoginView'
import Dashboard from './views/Dashboard'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false }
  }

  componentDidMount = () => {
    this._retrieveState()
  }

  _retrieveState = async () => {
    const loggedIn = await localStorage.getItem('loggedIn')
     if(loggedIn !== null) { this.setState({ loggedIn: JSON.parse(loggedIn) }) }
  }

  handleLoggedIn = async (loggedIn) => {
    await localStorage.setItem('loggedIn', JSON.stringify(loggedIn))
    this.setState({ loggedIn: loggedIn })
  }

  render() {
    console.log(localStorage.getItem('loggedIn'))
    return (
      <div className="App">
        {!this.state.loggedIn &&
        <LoginView handleLoggedIn={this.handleLoggedIn} />}
        {this.state.loggedIn && 
        <Dashboard handleLoggedIn={this.handleLoggedIn} />}
      </div>
    );
  }
}

export default App;
//<LoginView loggedIn={this.state.loggedIn}/>