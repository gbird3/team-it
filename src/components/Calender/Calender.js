import React, { Component } from 'react';
import moment from 'moment';
import firebase, {firebaseRef} from '../../Firebase';
import BigCalendar from 'react-big-calendar';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import event from './events';

import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calender extends Component {
  constructor() {
    super()

    this.state = {
      events: [],
      open: false,
      selected: []
    }

    this.ref = firebaseRef.child('Event');
    this.getEvents = this.getEvents.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  componentDidMount() {
    this.ref.on('value', this.getEvents)
  }

  componentWillUnmount() {
    this.ref.off('value', this.getEvents)
  }

  getEvents(snapshot) {
    let events = [];
    const eventObj = snapshot.val()
    for(let key in eventObj) {
      if(eventObj.hasOwnProperty(key)) {
        eventObj[key].start = new Date(eventObj[key].start);
        eventObj[key].end = new Date(eventObj[key].end);
        events.push(eventObj[key])
      }
    }
    this.setState({ events })
  }

  handleOpen = (event) => {
    console.log(event);
    this.setState({
      open: true,
      selected: event
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  addEvent(slotInfo) {
    alert(
      `selected slot: \n\nstart ${slotInfo.start.toISOString()} ` +
      `\nend: ${slotInfo.end.toLocaleString()}`)

    const newEvent = {
      title: "event",
      allDay: "false",
      start: slotInfo.start.toISOString(),
      end: slotInfo.end.toISOString(),
      team: "team1"
    }
    const newKey = this.ref.push().key
    this.ref.child(newKey).set(newEvent)
  }

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <BigCalendar
          {...this.props}
          selectable
          events={this.state.events}
          defaultView='week'
          onSelectEvent={event => this.handleOpen(event)}
          onSelectSlot={slotInfo => this.addEvent(slotInfo)}
        />
        <Dialog
          title={this.state.selected.title}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Only actions can close this dialog.
        </Dialog>
      </div>
    )
  }
}

export default Calender;
