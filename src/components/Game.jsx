import React, { Component } from 'react';
import Box from './Box';
import uuid from 'uuid/v1';
import EndGame from './EndGame';

class Game extends Component {
  numberOfClumns = 5;
  numberOfRows = 5;

  constructor(props) {
    super(props);
    this.state = {
      // boxStates: this.drawArray(),
      boxStates: [
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, false],
        [true, true, true, false, false],
      ],
      singleBoxes: [],
      updated: false,
      endGame: false,
    }
  }

  componentDidMount() {
    this.mapArray();
  }

  componentDidUpdate() {
    if (this.state.updated) {
      this.mapArray();

      this.checkEndGame();

      this.setState({
        updated: false
      })
    }
  }

  checkEndGame = () => {
    console.log('function checkEndGame')
  }

  restartGame = () => {
    const boxStates = this.drawArray();
    console.log(boxStates);

    this.setState({
      boxStates: boxStates,
      singleBoxes: [],
      updated: true,
      endGame: false,
    });

    this.componentDidUpdate();
  }

  drawArray = () => {
    let firstStateArray = [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ]

    let numbersOfRandoms = Math.floor(Math.random() * (this.numberOfClumns * 2)) + this.numberOfClumns;

    for (let i = 0; i < numbersOfRandoms; i++) {
      const col = Math.floor(Math.random() * this.numberOfClumns);
      const row = Math.floor(Math.random() * this.numberOfClumns);
      firstStateArray[row][col] = true;
    }

    return firstStateArray;
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
      this.state.endGame ? (
        <EndGame restartGame={this.restartGame} />
      ) : (
          <div className="game-board">
            {
              displayBoxes
            }
          </div>
        )
    );
  }
}

export default Game;