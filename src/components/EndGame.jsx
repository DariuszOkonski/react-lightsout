import React from 'react';

const EndGame = ({ restartGame }) => {
  return (
    <div className="endGame">
      <h1>end game</h1>
      <button onClick={restartGame} className="btn">Restart</button>
    </div>
  );
}

export default EndGame;