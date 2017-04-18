import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import MemberApp from '../Member/MemberApp';
import AddMember from '../Member/AddMember';
import Calender from '../Calender/Calender'

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const buttonStyle = {
  backgroundColor: 'transparent',
  color: 'white'
};

const leftButtons = (
    <div>
      <FlatButton label="Members" style={buttonStyle} containerElement={<Link to="/members"/>} />
      <FlatButton label="Calender" style={buttonStyle} containerElement={<Link to="/calender"/>} />
      <FlatButton label="Topics" style={buttonStyle} containerElement={<Link to="/topics"/>} />
    </div>
  );

const NavBar = () => (
  <Router>

    <div>
      <AppBar iconElementLeft={leftButtons}/>
      <br />
      <Route exact path="/" component={MemberApp}/>
      <Route path="/members" component={MemberApp}/>
      <Route path="/add-member" component={AddMember}/>
      <Route path="/calender" component={Calender}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)
export default NavBar
