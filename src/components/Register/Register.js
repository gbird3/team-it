import React, { Component } from 'react';
import firebase, {firebaseRef} from '../../Firebase';

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';


class Register extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: ''
    }

    this.ref = firebaseRef.child('User');
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let position = this.state.position;

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function(authData, error) {
      if (error) {
        console.log(error);
      } else {

        const newMember = {
          firstName: firstName,
          lastName: lastName,
          email: authData.email,
          position: position,
          team: 'Team1', // hardcoded for now until team functionality comes along
          uid: authData.uid
        }
        firebaseRef.child('User').child(authData.uid).set(newMember);

        document.location.href = '/members'
      }
    })

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
          <h2>Signup for Team-It</h2>
          <form className="InputCard-form" onSubmit={this.handleSubmit}>
            <TextField
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleTextChange}
              floatingLabelText="First Name" />
            <br />
            <TextField
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleTextChange}
              floatingLabelText="Last Name" />
            <br />
            <TextField
              name="position"
              value={this.state.position}
              onChange={this.handleTextChange}
              floatingLabelText="Position" />
            <br />
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
              label="Signup"
              onTouchTap={this.handleSubmit}>
            </RaisedButton>
          </form>
        </Paper>
      </div>
    );
  }
}

export default Register;
