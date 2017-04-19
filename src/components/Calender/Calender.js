import React, { Component } from 'react';
import moment from 'moment';
import {firebaseRef} from '../../Firebase';
import BigCalendar from 'react-big-calendar';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calender.css'

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calender extends Component {
  constructor() {
    super()

    this.state = {
      events: [],
      open: false,
      newOpen: false,
      selected: [],
      title: ''
    }

    this.ref = firebaseRef.child('Event');
    this.getEvents = this.getEvents.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
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
    this.setState({
      open: true,
      selected: event,
      start: event.start.toLocaleString(),
      end: event.end.toLocaleString()
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      newOpen: false
    });
  };

  newEventDialog(slotInfo) {
    this.setState({
      newOpen: true,
      title: slotInfo.title,
      start: slotInfo.start,
      end: slotInfo.end
    })
  }

  handleAddEvent(e) {
    e.preventDefault()
    if (this.state.title && this.state.start && this.state.end) {
      const newKey = this.ref.push().key

      const newEvent = {
        title: this.state.title,
        start: this.state.start.toISOString(),
        end: this.state.end.toISOString(),
        team: "team1",
        uid: newKey
      }
      this.ref.child(newKey).set(newEvent)
    }
    this.setState({newOpen: false})
  }

  handleTextChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  deleteEvent() {
    this.ref.child(this.state.selected.uid).remove();
    this.setState({
      selected: [],
      start: '',
      end: ''
    })
    this.handleClose();
  }

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        onTouchTap={this.deleteEvent}
      />,
    ];

    const EventActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Add"
        secondary={true}
        onTouchTap={this.handleAddEvent}
      />,
    ];

    const views = ['week', 'day'];

    return (
      <div>
        <div className="header">
          <h3>Team Schedule</h3>
          <p>To add a new event, simply click and drag the mouse across the desired time slots</p>
        </div>
        <div className="calender">
          <BigCalendar
            {...this.props}
            selectable
            popup
            events={this.state.events}
            defaultView='week'
            views={views}
            onSelectEvent={event => this.handleOpen(event)}
            onSelectSlot={slotInfo => this.newEventDialog(slotInfo)}
            scrollToTime={new Date()}
            min={moment('5:00am', 'h:mma').toDate()}
          />
        </div>
        <Dialog
          title="Event Information"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div>
            Name: {this.state.selected.title}
            <br /><br />
            Start Date: {this.state.start}
            <br /><br />
            End Date: {this.state.end}
            <br /><br />
          </div>
        </Dialog>
        <Dialog
          title="Add New Event"
          actions={EventActions}
          modal={true}
          open={this.state.newOpen}
        >
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="title"
              value={this.state.title}
              onChange={this.handleTextChange}
              floatingLabelText="Event Name:" />
            <br />
            <TextField
              name="start"
              value={this.state.start}
              disabled={true}
              floatingLabelText="Start Time:" />
            <br />
            <TextField
              name="end"
              value={this.state.end}
              disabled={true}
              floatingLabelText="End Time:" />
            <br />
          </form>
        </Dialog>
      </div>
    )
  }
}

export default Calender;
