import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
// import Header from './components/Header';
import LoginView from './views/LoginView'
import Dashboard from './views/Dashboard'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, user: null }
  }

  componentDidMount = () => {
    this._retrieveState()
  }

  _retrieveState = async () => {
    const loggedIn = await localStorage.getItem('loggedIn')
    const user = await localStorage.getItem('user')
     if(loggedIn !== null) { this.setState({ loggedIn: JSON.parse(loggedIn) }) }
     if(user !== null) { this.setState({ user: JSON.parse(user) })}
  }

  handleLoggedIn = async (loggedIn) => {
    console.log("modyfing loggeed")
    if(!loggedIn) {
      await localStorage.clear('user')
      this.setState({ user: null })
    }
    await localStorage.setItem('loggedIn', JSON.stringify(loggedIn))
    this.setState({ loggedIn: loggedIn })
  }

  handleUser = async (user) => { 
    if(user === null) {
      await localStorage.setItem("loggedIn", JSON.stringify(false));
      this.setState({ loggedIn: false })
    }
    await localStorage.setItem('user', JSON.stringify(user))
    this.setState({ user: user })
  }

  render() {
    return (
      <div className="App" style={{ height: '100vh', overflow: 'hidden' }}>
        {!this.state.loggedIn && this.state.user === null &&
        <LoginView handleLoggedIn={this.handleLoggedIn} handleUser={this.handleUser}/>}
        {this.state.loggedIn && this.state.user !== null &&
        <Dashboard handleLoggedIn={this.handleLoggedIn} user={this.state.user} changeUser={this.handleUser}/>}
      </div>
    );
  }
}

export default App;
//<LoginView loggedIn={this.state.loggedIn}/>