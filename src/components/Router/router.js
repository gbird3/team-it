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


const buttonStyle = {
  backgroundColor: 'transparent',
  color: 'white'
};

const leftButtons = (
    <div>
      <FlatButton label="Members" style={buttonStyle} containerElement={<Link to="/members"/>} />
      <FlatButton label="Calender" style={buttonStyle} containerElement={<Link to="/calender"/>} />
    </div>
  );

const rightButtons = (
    <div>
      <FlatButton label="Signup" style={buttonStyle} containerElement={<Link to="/register"/>} />
      <FlatButton label="Login" style={buttonStyle} containerElement={<Link to="/login"/>} />
    </div>
  );

class NavBar extends Component {
  constructor(){
    super()

    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged()
    .then((user) => {
      if (user) {
        this.setState({loggedIn: true})
        console.log(this.state);
      } else {
        this.setState({loggedIn: false})
        console.log(this.state);
      }
    })
  }
  render() {
    return (
      <Router>
        <div>
          <AppBar iconElementLeft={leftButtons} iconElementRight={rightButtons}/>
          <Route exact path="/" component={Login}/>
          <Route path="/members" component={MemberApp}/>
          <Route path="/register" component={Register}/>
          <Route path="/add-member" component={AddMember}/>
          <Route path="/calender" component={Calender}/>
          <Route path="/login" component={Login}/>
        </div>
      </Router>
    )
  }
}
export default NavBar
