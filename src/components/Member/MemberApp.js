import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'

import MemberList from './MemberList';


import './MemberApp.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="MainPage-main-content">
          <div>
            <RaisedButton label="Add Member" primary={true} className="addMemberBtn" containerElement={<Link to="/add-member"/>} />
          </div>
          <MemberList />
        </div>
      </div>
    );
  }
}

export default App;
