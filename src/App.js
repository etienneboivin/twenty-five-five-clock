import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core"
import {faArrowDown, faArrowUp, faPlay, faPause, faClockRotateLeft} from "@fortawesome/free-solid-svg-icons"
import './App.css';

library.add(faArrowDown, faArrowUp, faPlay, faPause, faClockRotateLeft);

var timer = null;

export class TimerLengthControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="control-label">{this.props.title}
        <div>
          <button value="-" onClick={(e) => this.props.handleClick(e)}>
            <FontAwesomeIcon icon="fa-arrow-down" size="2x"/>
          </button>
          {this.props.length}
          <button value="+" onClick={(e) => this.props.handleClick(e)}>
            <FontAwesomeIcon icon="fa-arrow-up" size="2x"/>
          </button>
        </div>
        </div>
      </div>
    )
  }
}

export class Timer extends React.Component {
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
        <div id="container">
          <div id="main-title">25 + 5 Clock</div>
          <div className="length-control">
            <div className="grid-child">
              <TimerLengthControl
                title="Break Length"
                lengthID="break-length"
                length={this.state.breakLength}
                handleClick={this.breakClick} />
            </div>
            <div className="grid-child">
              <TimerLengthControl
                title="Session Length"
                lengthID="session-length"
                length={this.state.seshLength}
                handleClick={this.seshClick}/>
            </div>
          </div>
          <div className="time-display">
            <div>{this.state.break ? "Break" : "Session"}</div>
            <div>{this.state.display}</div>
          </div>
          <div id="buttons">
            <button value="play" onClick={this.play}>
              <FontAwesomeIcon icon="fa-play" size='2x'/>
            </button>
            <button value="pause" onClick={this.pause}>
              <FontAwesomeIcon icon="fa-pause" size='2x'/>
            </button>
            <button value="reset" onClick={this.reset}>
              <FontAwesomeIcon icon="fa-clock-rotate-left" size='2x'/>
            </button>
          </div>
        </div>
    )
  }
}
