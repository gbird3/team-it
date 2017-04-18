import React, { Component } from 'react';
import {firebaseRef} from '../../Firebase';

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import ContentSend from 'material-ui/svg-icons/content/send'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import './AddMember.css';


class AddMember extends Component {
  constructor() {
    super()

    this.state = {
      newMember: ''
    }

    this.ref = firebaseRef.child('User')
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.firstName && this.state.lastName) {
      const newMember = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        position: this.state.position
      }

      const newKey = this.ref.push().key
      this.ref.child(newKey).set(newMember)

      document.location.href = '/members'
    }
  }

  handleTextChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <Paper className="InputCard">
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
            name="email"
            value={this.state.email}
            onChange={this.handleTextChange}
            floatingLabelText="Email" />
          <br />
          <TextField
            name="position"
            value={this.state.position}
            onChange={this.handleTextChange}
            floatingLabelText="Position" />
          <br />
          <FloatingActionButton
            onTouchTap={this.handleSubmit}>
            <ContentSend />
          </FloatingActionButton>
        </form>
      </Paper>
    );
  }
}

export default AddMember;
