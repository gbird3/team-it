import React, { Component } from 'react';
import firebase, {firebaseRef} from '../../Firebase';

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

import './Login.css';

class Login extends Component {
  constructor() {
    super()

    this.state = {
      error: '',
      email: '',
      password: ''
    }

    this.ref = firebaseRef.child('User');
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      this.setState({
        error: 'Please enter both an email and password!'
      })
    } else {
      this.setState({ error: '' })
      const email = this.state.email
      const password = this.state.password

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((fireUser) => {
        const uid = fireUser.uid
        firebase.database().ref().child('User').child(uid)
        .once('value').then((snapshot) => {
          if (snapshot && snapshot.val()) {
            const user = snapshot.val()
            console.log(user);
            document.location.href = '/members';
          } else {
            this.setState({
              error: 'No users node in the database!'
            })
          }
        }).catch((error) => {
          this.setState({
            error: error.message,
            password: ''
          })
        })
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          password: ''
        })
      })
    }
  }

  handleTextChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="flexbox-container">
        <Paper className="InputCard">
          <h2>Login to Team-It</h2>
          { this.state.error && <h4 className="error">{this.state.error}</h4> }
          <form className="InputCard-form" onSubmit={this.handleSubmit}>
            <TextField
              name="email"
              value={this.state.email}
              onChange={this.handleTextChange}
              floatingLabelText="Email" />
            <br />
            <TextField
              name="password"
              value={this.state.password}
              onChange={this.handleTextChange}
              type="password"
              floatingLabelText="Password" />
            <br />
            <RaisedButton
              className="btn"
              primary={true}
              label="Login"
              onTouchTap={this.handleSubmit}>
            </RaisedButton>
          </form>
        </Paper>
      </div>
    );
  }
}

export default Login;
