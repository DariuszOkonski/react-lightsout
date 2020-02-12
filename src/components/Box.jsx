import React from 'react';

const Box = ({ isOn, id }) => {
  const bolb = isOn ? 'isOn' : 'isOff';

  // console.log(bolb)

  return (
    <div id={id} className={`box ${bolb}`}></div>
  );
}

export default Box;