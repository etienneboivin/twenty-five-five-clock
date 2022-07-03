import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core"
import {faArrowDown, faArrowUp, faPlay, faPause, faClockRotateLeft} from "@fortawesome/free-solid-svg-icons"
import './App.css';

library.add(faArrowDown, faArrowUp, faPlay, faPause, faClockRotateLeft);

var timer = null;

class TimerLengthControl extends React.Component {
  // Two buttons & a label. Two needed in the timer, one for session and one for breaks.
  // props to be passed: Label (Title), initial length, button needs value
  // buttons should not work if Timer is running
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="break-label">{this.props.title}</div>
        <button value="-" onClick={(e) => this.props.handleClick(e)}>
          <FontAwesomeIcon icon="fa-arrow-down" />
        </button>
        {this.props.length}
        <button value="+" onClick={(e) => this.props.handleClick(e)}>
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
      currentBreakLength: 5,
      seshLength: 25,
      currentSeshLength: 25,
      pause: true,
      break: false,
    }
    this.breakClick = this.breakClick.bind(this);
    this.seshClick = this.seshClick.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.timeDisplay = this.timeDisplay.bind(this);
  }

  breakClick = (e) => {
    if(e.target.value === "+" && this.state.breakLength !== 60) {
      this.setState({breakLength: this.state.breakLength + 1,
                    currentBreakLength: this.state.currentBreakLength + 1});
    } else if (e.target.value === "-" && this.state.breakLength !== 1) {
      this.setState({count: this.state.breakLength - 1});
    }
  }

  seshClick = (e) => {
    if(e.target.value === "+" && this.state.seshLength !== 60) {
      this.setState({seshLength: this.state.seshLength + 1,
                    currentSeshLength: this.state.currentSeshLength + 1});
    } else if (e.target.value === "-" && this.state.seshLength !== 1) {
      this.setState({count: this.state.seshLength - 1});
    }
  }

  play = () => {
    this.setState({pause: false});
    timer = setInterval(() => {
      this.setState({currentSeshLength: this.state.currentSeshLength - 1})
    }, 1000)
  }

  pause = () => {
    this.setState({pause: true});
    clearInterval(timer);
  }

  reset = () => {
    clearInterval(timer);
    this.setState({
      currentBreakLength: this.state.breakLength,
      currentSeshLength: this.state.seshLength,
      pause: true,
      break: false})
  }

  timeDisplay = (min, sec) => {
    let timeStr = "";
    let secStr = "";
    if(sec < 10) {
      secStr = "0" + sec;
    }

  }

  render () {
      return (
        <>
          <div className="main-title">25 + 5 Clock</div>
          <TimerLengthControl
            title="Break Length"
            lengthID="break-length"
            length={this.state.breakLength}
            handleClick={this.breakClick} />
          <TimerLengthControl
            title="Session Length"
            lengthID="session-length"
            length={this.state.seshLength}
            handleClick={this.seshClick}/>
          <div className="time-display">{this.state.currentSeshLength}</div>
          <button value="play" onClick={this.play}>
            <FontAwesomeIcon icon="fa-play" />
          </button>
          <button value="pause" onClick={this.pause}>
            <FontAwesomeIcon icon="fa-pause" />
          </button>
          <button value="reset" onClick={this.reset}>
            <FontAwesomeIcon icon="fa-clock-rotate-left" />
          </button>
        </>
    )
  }
}

export { TimerLengthControl, Timer };
