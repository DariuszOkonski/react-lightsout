import React, { Component } from 'react';
import Box from './Box';
import uuid from 'uuid/v1';

class Game extends Component {
  numberOfClumns = 5;
  numberOfRows = 5;

  state = {
    boxStates: [
      // [true, false, true, false, false],
      // [false, true, true, false, true],
      // [false, false, true, false, false],
      // [true, true, true, false, false],
      // [true, false, true, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ],
    singleBoxes: [],
    updated: false,
  }

  componentDidMount() {
    this.mapArray();
  }

  componentDidUpdate() {
    if (this.state.updated) {
      this.mapArray();

      this.setState({
        updated: false
      })
    }
  }

  mapArray = () => {
    let singleBoxes = [];

    for (let i = 0; i < this.numberOfClumns; i++) {
      for (let j = 0; j < this.numberOfRows; j++) {
        singleBoxes.push({ name: `${i}-${j}`, on: this.state.boxStates[i][j] })
      }
    }

    this.setState({
      singleBoxes
    })
  }

  switchBoxState = (col, row, boxStates) => {
    // console.log(`col: ${col} row: ${row}... ${this.numberOfClumns}`)

    if (col === 0 && row === 0) {
      //left top corner
      boxStates[row][col] = !boxStates[row][col];
      boxStates[row][col + 1] = !boxStates[row][col + 1];
      boxStates[row + 1][col] = !boxStates[row + 1][col];
    } else if (col === this.numberOfClumns - 1 && row === 0) {
      //right top corner
      boxStates[row][col] = !boxStates[row][col];
      boxStates[row + 1][col] = !boxStates[row + 1][col];
      boxStates[row][col - 1] = !boxStates[row][col - 1];
    } else if (col === this.numberOfClumns - 1 && row === this.numberOfRows - 1) {
      //right bottom corner
      boxStates[row][col] = !boxStates[row][col];
      boxStates[row - 1][col] = !boxStates[row - 1][col];
      boxStates[row][col - 1] = !boxStates[row][col - 1];
    } else if (col === 0 && row === this.numberOfRows - 1) {
      //left bottom corner
      boxStates[row][col] = !boxStates[row][col];
      boxStates[row - 1][col] = !boxStates[row - 1][col];
      boxStates[row][col + 1] = !boxStates[row][col + 1];
    } else if ((col > 0 && col < this.numberOfClumns - 1) && row === 0) {
      //top edge
      boxStates[row][col] = !boxStates[row][col];
      boxStates[row + 1][col] = !boxStates[row + 1][col];
      boxStates[row][col - 1] = !boxStates[row][col - 1];
      boxStates[row][col + 1] = !boxStates[row][col + 1];
    } else if (col === this.numberOfClumns - 1 && (row > 0 && row < this.numberOfRows - 1)) {
      //right edge
      boxStates[row][col] = !boxStates[row][col];
      boxStates[row - 1][col] = !boxStates[row - 1][col];
      boxStates[row + 1][col] = !boxStates[row + 1][col];
      boxStates[row][col - 1] = !boxStates[row][col - 1];
    } else if ((col > 0 && col < this.numberOfClumns - 1) && row === this.numberOfRows - 1) {
      //bottom edge
      boxStates[row][col] = !boxStates[row][col];
      boxStates[row][col + 1] = !boxStates[row][col + 1];
      boxStates[row][col - 1] = !boxStates[row][col - 1];
      boxStates[row - 1][col] = !boxStates[row - 1][col];
    } else if (col === 0 && (row > 0 && row < this.numberOfRows - 1)) {
      //left edge
      boxStates[row][col] = !boxStates[row][col];
      boxStates[row + 1][col] = !boxStates[row + 1][col];
      boxStates[row - 1][col] = !boxStates[row - 1][col];
      boxStates[row][col + 1] = !boxStates[row][col + 1];
    } else {
      boxStates[row][col] = !boxStates[row][col];
      boxStates[row][col - 1] = !boxStates[row][col - 1];
      boxStates[row][col + 1] = !boxStates[row][col + 1];
      boxStates[row - 1][col] = !boxStates[row - 1][col];
      boxStates[row + 1][col] = !boxStates[row + 1][col];
    }

    return boxStates;
  }

  handleBoxState = (id) => {
    const col = Number(id.substr(2, 1));
    const row = Number(id.substr(0, 1));

    let boxStates = [];

    boxStates = this.switchBoxState(col, row, [...this.state.boxStates]);

    this.setState({
      boxStates,
      updated: true,
    })
  }



  render() {
    const displayBoxes = this.state.singleBoxes.map(box =>
      <Box
        key={uuid()}
        id={box.name}
        isOn={box.on}
        handleBoxState={this.handleBoxState}
      />)

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