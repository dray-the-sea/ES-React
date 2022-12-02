import React from 'react';
import './App.css';
const moment = require('moment');

class ObservationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeling: '',
      person: '',
      activity: '',
      timestamp: ''
    };
    this.handleFeelingChange = this.handleFeelingChange.bind(this);
    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFeelingChange(event) {
    this.setState({ feeling: event.target.value });
  }

  handlePersonChange(event) {
    this.setState({ person: event.target.value });
  }

  handleActivityChange(event) {
    this.setState({ activity: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ timestamp: moment().format('YYYY-MM-DD, hh:mm:ss') })

    const requestBody = {
      "feeling": this.state.feeling,
      "activity": this.state.activity,
      "company": this.state.person
    };

    console.log(requestBody);

    fetch('/api/user/8/observation',  {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(requestBody), 
      
    });
  }

  render() {
    if (this.state.timestamp) {
      return (
        <div className="App">
          <div><b>here's what you've shared at {this.state.timestamp}</b></div>
          <div>Feeling: {this.state.feeling}</div>
          <div>With: {this.state.person}</div>
          <div>Activity: {this.state.activity}</div>
        </div>
      )
    }
    else {
      return (
        <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            How do you feel? <br />
            <input type="text" value={this.state.feeling} onChange={this.handleFeelingChange} />
          </label><p />
          <label>
            Who are you with? <br />
            <input type="text" value={this.state.person} onChange={this.handlePersonChange} />
          </label><p />
          <label>
            What are you doing?<br />
            <input type="text" value={this.state.activity} onChange={this.handleActivityChange} />
          </label><p />
          <input type="submit" value="Submit" />
        </form>
        </div>
      );
    }
  }

}

export default ObservationForm;
