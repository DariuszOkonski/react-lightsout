import React from 'react';

const Box = ({ isOn }) => {
  const bolb = isOn ? 'isOn' : 'isOff';

  console.log(bolb)

  return (
    <div className={`box ${bolb}`}></div>
  );
}

export default Box;