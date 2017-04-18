import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const Member = ({ project, ...otherProps }) => {
  return (
    <TableRow {...otherProps}>
      <TableRowColumn>{project.name}</TableRowColumn>
      <TableRowColumn>{project.date}</TableRowColumn>
    </TableRow>
  )
}

export default Member;
