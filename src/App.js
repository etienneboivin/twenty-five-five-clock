import React from 'react';
import ReactDOM from 'react-dom/client';
import { IconName } from "react-icons/fa";
import './App.css';

function TimerHeader() {
  // TODO State hook goes here
  return (
    <>
      <i class="fa fa-arrow-down"></i>
      <div id="break-label">Break Length</div>
      <i class="fa fa-arrow-up"></i>
      <i class="fa fa-arrow-down"></i>
      <div id="session-label">Session Length</div>
      <i class="fa fa-arrow-up"></i>
    </>
  )
}


export default TimerHeader;
