import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core"
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons"
import './App.css';

library.add(faArrowDown, faArrowUp);

class TimerLengthControl extends React.Component {
  // Two buttons & a label. Two needed in the timer, one for session and one for breaks.
  // props to be passed: Label (Title), initial length, button needs value
  // buttons should not work if Timer is running
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.length
    }
  }

  onClick = () => {
    if(this.state.sign === "+" && this.state.count !== 60) {
      setState({count: count + 1});
    } else if (this.state.sign === "-" && this.state.count !== 1) {
      setState({count: count - 1});
    }
  }

  render() {
    return (
      <div>
        <div id="break-label">{this.props.title}</div>
        <button sign="-" onClick={this.props.onClick}>
          <FontAwesomeIcon icon="fa-arrow-down" />
        </button>
        {this.state.count}
        <button sign="+" onClick={() => this.props.onClick}>
          <FontAwesomeIcon icon="fa-arrow-up" />
        </button>
      </div>
    )
  }
}

class Timer extends React.Component {
  // Contains title, two TimerLengthControl, and actual session/break display, pause/start/reset button
  // will be passed timer length, whether on break or on session
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      seshLength: 25
    }
  }

  render () {
      return (
        <>
          <div className="main-title">25 + 5 Clock</div>
          <TimerLengthControl
            title="Break Length"
            length={this.state.breakLength} />
          <TimerLengthControl
            title="Session Length"
            length={this.state.seshLength} />
        </>
    )
  }
}

export TimerLengthControl;
export Timer;
