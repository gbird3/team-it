import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import MemberList from './MemberList';


import './MemberApp.css';

class App extends Component {
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
  render() {
    return (
        <div>
          <div className="flexbox-container">
            <RaisedButton label="Add Member" primary={true} className="addMemberBtn" containerElement={<Link to="/add-member"/>} />
            <br />
            <MemberList />
          </div>
        </div>
    );
  }
}

export default App;
