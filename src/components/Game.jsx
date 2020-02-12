import React, { Component } from 'react';
import Box from './Box';

class Game extends Component {
  state = {}

  render() {
    return (
      <div className="game-board">
        <Box isOn={true} />
        <Box isOn={false} />
        <Box isOn={true} />
        <Box isOn={false} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
        <Box isOn={true} />
      </div>
    );
  }
}

export default Game;