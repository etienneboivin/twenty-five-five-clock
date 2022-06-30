import logo from './logo.svg';
import './App.css';

class TimerHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div id="break-label">Break Length</div>
      <div id="session-label">Session Length</div>
    )
  }
}

export default TimerHeader;
