import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import LoginView from './views/LoginView'
import Dashboard from './views/Dashboard'
import AdminDashboard from './views/AdminDashboard';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, user: null, darkTheme: false }
  }

  componentDidMount = () => {
    this._retrieveState()
  }

  _retrieveState = async () => {
    const loggedIn = await localStorage.getItem('loggedIn')
    const user = await localStorage.getItem('user')
    const dark = await localStorage.getItem('darkTheme')
     if(loggedIn !== null) { this.setState({ loggedIn: JSON.parse(loggedIn) }) }
     if(user !== null) { this.setState({ user: JSON.parse(user) })}
     if(dark !== null) { this.setState({ darkTheme: JSON.parse(dark) })}
  }

  handleLoggedIn = async (loggedIn) => {
    if(!loggedIn) {
      await localStorage.clear('user')
      this.setState({ user: null, loggedIn: false })
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

  switchTheme = async () => {
    await localStorage.setItem('darkTheme', JSON.stringify(!this.state.darkTheme))
    this.setState({ darkTheme: !this.state.darkTheme })
  }

  render() {
    return (
      <div className="App" style={{ height: '100vh', overflow: 'hidden' }}>
        {!this.state.loggedIn && this.state.user === null &&
        <LoginView handleLoggedIn={this.handleLoggedIn} handleUser={this.handleUser}/>}
        {this.state.loggedIn && this.state.user !== null && this.state.user.typeId === 1 &&
        <Dashboard handleLoggedIn={this.handleLoggedIn} user={this.state.user} changeUser={this.handleUser} darkTheme={this.state.darkTheme} switchTheme={this.switchTheme}/>}
        {this.state.loggedIn && this.state.user !== null && this.state.user.typeId === 2 &&
        <AdminDashboard handleLoggedIn={this.handleLoggedIn} user={this.state.user} changeUser={this.handleUser} darkTheme={this.state.darkTheme} switchTheme={this.switchTheme}/>}
      </div>
    );
  }
}