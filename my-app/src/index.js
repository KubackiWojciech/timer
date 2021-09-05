import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
       time: new Date(),
       interval: 1,
       timestamps: [],
       isToggleOn: true
    };

    //binding:
    this.tick=this.tick.bind(this);
    this.RenderCurrentTime=this.RenderCurrentTime.bind(this);
    this.RenderTimestamps=this.RenderTimestamps.bind(this);
    this.stopToggling=this.stopToggling.bind(this);
    this.startToggling=this.startToggling.bind(this);
    this.makeTimestamp=this.makeTimestamp.bind(this);
    
    this.interval = setInterval(this.tick, this.state.interval);
  }

  tick() {
    this.setState({
      time: new Date()
    })
  }

  RenderCurrentTime() {
    return (
      <h1>
      {this.state.time.toLocaleTimeString() + ":" + this.state.time.getMilliseconds()}
    </h1>
    )
  }

  RenderButton(props) {
      return(
        <button onClick={props.func}>{props.label}</button>
      )
    }

  RenderTimestamps() {
    return (
      <Fragment>
        <h1>Timestamps:</h1>
        <ol>
          {this.state.timestamps.map(timestamp => renderList(timestamp))}
        </ol>
      </Fragment>
    )
  }

  stopToggling() {
    this.setState({
      isToggleOn: false
    })
    clearInterval(this.interval);
  }

  startToggling() {
    this.setState({
      isToggleOn: true
    })
    this.interval=setInterval(this.tick, this.state.interval);
  }

  setTickRatio(props) {
    this.setState({
      interval: props
    });
    clearInterval(this.interval);
    this.interval=setInterval(this.tick, props);
  }

  makeTimestamp() {
    this.setState({
      timestamps: this.state.timestamps.concat([this.state.time])
    })
  }

  render() {
    return(
      <div>
      <this.RenderCurrentTime />
      <this.RenderButton func={this.setTickRatio.bind(this, 1000)} label="set ratio to 1000"/> 
      <this.RenderButton func={this.setTickRatio.bind(this, 1)} label="set ratio to 1"/>    
      {this.state.isToggleOn ? 
      <this.RenderButton func={this.stopToggling} label="stop toggling"/> :
      <this.RenderButton func={this.startToggling} label="start toggling"/>
      }
      <this.RenderButton func={this.makeTimestamp} label="make timestamp"/> 
      <this.RenderTimestamps />
      </div>
    )
  }
}

function renderList (timestamp) { 
  return (
    <li>{timestamp.toLocaleTimeString() + ":" + timestamp.getMilliseconds()}</li>
  )
}

ReactDOM.render(
  <Timer />,
  document.getElementById("root")
)