import firebase from 'firebase';
import React, { Component } from 'react';

import InputCard from '../InputCard/InputCard';
import MessageBox from '../MessageBox/MessageBox';

import './MainPage.css';

class MainPage extends Component {
  constructor() {
    super()

    this.state = {
      user: {
        'name': '',
        'email': '',
        'uid': ''
      }
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
      } else {
        console.log("no user");
        document.location.href = '/login';
      }
    });
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
    this.setState({user})
  }
  
  render() {
    return (
      <div className="MainPage">
        <div className="MainPage-authenticated-content">
          <MessageBox />
          <InputCard name={this.state.user.displayName} />
        </div>
      </div>
    )
  }
}

export default MainPage
