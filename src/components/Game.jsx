import React, { Component } from 'react';
import Box from './Box';
import uuid from 'uuid/v1';

class Game extends Component {
  static numberOfClumns = 5;
  static numberOfRows = 5;

  state = {
    boxStates: [
      [true, false, true, false, false],
      [true, true, true, false, true],
      [false, false, true, false, false],
      [true, true, true, false, false],
      [true, false, true, false, false],
    ],
    singleBoxes: []
  }

  componentDidMount() {
    this.mapArray();
  }

  mapArray = () => {
    let singleBoxes = [];

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        singleBoxes.push({ name: `${i}-${j}`, on: this.state.boxStates[i][j] })
      }
    }

    this.setState({
      singleBoxes
    })
  }

  render() {
    const displayBoxes = this.state.singleBoxes.map(box =>
      <Box key={uuid()} id={box.name} isOn={box.on} />)

    return (
      <div className="game-board">
        {
          displayBoxes
        }
      </div>
    );
  }
}

export default Game;