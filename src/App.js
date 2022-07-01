import React from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './App.css';

function TimerHeader() {
  // TODO State hook goes here
  return (
    <>
      <FontAwesomeIcon icon="fa-arrow-down" />
      <div id="break-label">Break Length</div>
      <FontAwesomeIcon icon="fa-arrow-up" />
      <FontAwesomeIcon icon="fa-arrow-down" />
      <div id="session-label">Session Length</div>
      <FontAwesomeIcon icon="fa-arrow-up" />
    </>
  )
}


export default TimerHeader;
