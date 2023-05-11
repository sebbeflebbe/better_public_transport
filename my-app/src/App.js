import React from 'react';
import MapContainer from './MapContainer';

function App() {
  return (
    <div>
      <h1 style={{textAlign: 'center', color: 'green', border: 'none', padding: '10px', textShadow: '2px 2px 4px purple'}}>Geocatching</h1>
      <div style={{border: '5px solid black', margin: '10px'}}>
      <MapContainer />
      </div>
    </div>


  );
}

export default App;
