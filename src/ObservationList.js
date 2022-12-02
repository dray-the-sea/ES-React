import React, { useRef, useState } from 'react';
import './App.css';

class ObservationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            observations: props.observations
        };
    }


    render() {
        if (!this.props.observations) {
            return (
                <div className="App">
                    <hr />
                    <div>Hello! Once you log some observations, you'll be able to see them here.</div>
                </div>
            )
        }
        else {
            return (
                <div className="App">
                    <hr />
                    We got us {this.props.observations.length} observations!
                    <table>
                        <thead>
                            <tr><td>Time</td><td>Feeling</td><td>Activity</td><td>Company</td></tr>
                        </thead>
                        <tbody>
                            {this.props.observations &&
                                this.props.observations.map((o) => (
                                    <tr key={o.observationid}>
                                        <td>{o.created}</td>
                                        <td>{o.feeling}</td>
                                        <td>{o.activity}</td>
                                        <td>{o.company}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                </div>
            );
        }
    }
}


export default ObservationList;