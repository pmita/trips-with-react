import { useState } from 'react';
import './App.css';
//COMPONENTS
import TripList from './components/TripList';

function App() {
  //STATE
  const [showTrips, setShowTrips] = useState(true);
  return (
    <div className="App">
      <h1>Test</h1>
      {showTrips && <TripList />}
      <button onClick={() => setShowTrips(false)}>Toggle Me</button>
    </div>
  );
}

export default App;
