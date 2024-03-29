import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {firebaseRef} from '../../Firebase/';

import './MemberList.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      members: []
    }

    this.ref = firebaseRef.child('User')
    this.getMembers = this.getMembers.bind(this)
  }

  componentDidMount() {
    this.ref.on('value', this.getMembers)
  }

  componentWillUnmount() {
    this.ref.off('value', this.getMembers)
  }

  getMembers(snapshot) {
    let members = [];
    const memberObj = snapshot.val()
    for(let key in memberObj) {
      if(memberObj.hasOwnProperty(key)) {
        members.push(memberObj[key])
      }
    }
    console.log(members);
    this.setState({ members: members })
  }

  render() {
    return (
      <div className="MemberList">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Position</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.state.members.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{row.firstName}</TableRowColumn>
                <TableRowColumn>{row.lastName}</TableRowColumn>
                <TableRowColumn>{row.email}</TableRowColumn>
                <TableRowColumn>{row.position}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default App;
