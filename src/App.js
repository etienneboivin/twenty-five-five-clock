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
      seshLength: 25,
      seconds: 1500,
      display: "25:00",
      pause: true,
      break: false,
    }
    this.breakClick = this.breakClick.bind(this);
    this.seshClick = this.seshClick.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.timeDisplay = this.timeDisplay.bind(this);
    this.modeSwitch = this.modeSwitch.bind(this);
  }

  breakClick = (e) => {
    if(e.target.value === "+" && this.state.breakLength !== 60) {
      this.setState({breakLength: this.state.breakLength + 1});
    } else if (e.target.value === "-" && this.state.breakLength !== 1) {
      this.setState({breakLength: this.state.breakLength - 1});
    }
  }

  seshClick = (e) => {
    if(e.target.value === "+" && this.state.seshLength !== 60) {
      this.setState({seshLength: this.state.seshLength + 1,
                    seconds: this.state.seconds + 60}, this.timeDisplay);
    } else if (e.target.value === "-" && this.state.seshLength !== 1) {
      this.setState({seshLength: this.state.seshLength - 1,
                    seconds: this.state.seconds - 60}, this.timeDisplay);
    }
  }

  timeDisplay = () => {
    let min = Math.floor(this.state.seconds/60);
    let sec = this.state.seconds % 60;
    min = (min < 10 ? '0' + min : min);
    sec = (sec < 10 ? '0' + sec : sec);
    this.setState({display: min + ':' + sec});
  }

  modeSwitch = () => {
    clearInterval(timer);
      if(!this.state.break) {
      this.setState({
        seconds: this.state.breakLength * 60,
        break: !this.state.break
      }, () => {
        this.timeDisplay();
        this.play();
      })
  } else {
      this.setState({
        seconds: this.state.seshLength * 60,
        break: !this.state.break
      }, () => {
        this.timeDisplay();
        this.play();
      })
    }
  }

  play = () => {
    this.setState({pause: false});
    timer = setInterval(() => {
      if(this.state.seconds > 0) {
        this.setState({seconds: this.state.seconds - 1},
          this.timeDisplay)
      } else {
         this.modeSwitch();
      }
    }, 1000)
  }

  pause = () => {
    this.setState({pause: true});
    clearInterval(timer);
  }

  reset = () => {
    this.setState({
      seconds: this.state.seshLength * 60,
      pause: true,
      break: false}, this.timeDisplay)
    clearInterval(timer);
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
          <div className="timer-title">{this.state.break ? "Break" : "Session"}</div>
          <div className="time-display">{this.state.display}</div>
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
