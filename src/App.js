import logo from './logo.svg';
import './App.css';
import React, { useRef, useState, useEffect } from 'react';
import ObservationForm from './ObservationForm';
import ObservationList from './ObservationList';

function App() {
  const baseURL = "/api";
  const get_id = 8;
  let errorMessage = "";
  const [observations, setObservations] = useState(null);


  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }

  async function getObservations() {
    console.log("get observations was called");

    if (get_id) {
      try {
        const res = await fetch(`${baseURL}/user/${get_id}/observations`);

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();
        setObservations(data);
      } catch (err) {
        errorMessage = "there was an error: " + fortmatResponse(err.message);
      }
    } else {
      errorMessage = "missing id. not much i can do here."
    }

  }

  useEffect(() => {
    getObservations();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ObservationForm />
        <ObservationList observations={observations} />
        <div>{errorMessage}</div>
      </header>
    </div>
  );
}

export default App;

//{ getResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{getResult}</pre></div> }