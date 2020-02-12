import React from 'react';

const Box = ({ isOn, id, handleBoxState }) => {
  const bolb = isOn ? 'isOn' : 'isOff';

  return (
    <div
      id={id}
      className={`box ${bolb}`}
      onClick={() => handleBoxState(id)}
    ></div>
  );
}

export default Box;