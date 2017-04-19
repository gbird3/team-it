import React, { Component } from 'react';
import {firebaseRef} from '../../Firebase';

import Paper from 'material-ui/Paper'



class Landing extends Component {
  render() {
    return (
      <div>
        <h1>The Team App</h1>
        <img src="../../../public/the-ball-488701_640.jpg" />
      </div>
    );
  }
}

export default Landing;
