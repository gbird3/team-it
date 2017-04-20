import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import firebase from '../../Firebase/';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import MemberApp from '../Member/MemberApp';
import AddMember from '../Member/AddMember';
import Calender from '../Calender/Calender';
import Register from '../Register/Register';
import Login from '../Login/Login'
import Messaging from '../Messaging/MainPage/MainPage';


const buttonStyle = {
  backgroundColor: 'transparent',
  color: 'white'
};

class LogoutView extends Component {
  componentWillMount () {
        firebase.auth().signOut()
        document.location.href = '/login';
    }

    render () {
        return null;
    }
}

const leftButtons = (
    <div>
      <FlatButton label="Members" style={buttonStyle} containerElement={<Link to="/members"/>} />
      <FlatButton label="Calender" style={buttonStyle} containerElement={<Link to="/calender"/>} />
      <FlatButton label="Messaging" style={buttonStyle} containerElement={<Link to="/messaging"/>} />
    </div>
  );

const rightButtons = (
    <div>
      <FlatButton label="Signup" style={buttonStyle} containerElement={<Link to="/register"/>} />
      <FlatButton label="Login" style={buttonStyle} containerElement={<Link to="/login"/>} />
      <FlatButton label="Logout" style={buttonStyle} containerElement={<Link to="/logout"/>} />
    </div>
  );

class NavBar extends Component {
  constructor(){
    super()

    this.state = {
      loggedIn: false
    }
  }

  render() {
    return (
      <Router>
        <div>
          <AppBar iconElementLeft={leftButtons} iconElementRight={rightButtons} />
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={LogoutView} />
          <Route path="/members" component={MemberApp} />
          <Route path="/add-member" component={AddMember} />
          <Route path="/calender" component={Calender} />
          <Route path="/messaging" component={Messaging} />
        </div>
      </Router>
    )
  }
}
export default NavBar
