import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className="app">
      <h3 className="headlights">
        <span className="lights">Lights -</span><span className="out"> Out</span>
      </h3>
      <Game />
    </div>
  );
}

export default App;
