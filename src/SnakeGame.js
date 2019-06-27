import React from 'react';
import logo from './logo.svg';
import './App.css';

let gameTimer;

class SnakeGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardX: 10,
      boardY: 10,
      snakeSquares: [
        {x: 1, y: 9},
        {x: 0, y: 9}
      ],
      foodSquare: {x: 8, y: 8},
      direction: false,
      gameSpeedMS: 1000
    }

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.startGame();
    document.addEventListener("keydown", (e) => {
      console.warn(e.keyCode);
      let newDirection = this.state.direction;
      // W
      if (e.keyCode == '87' && this.state.direction !== "down") {
        newDirection = "up";
      }
      // S
      else if (e.keyCode == '83' && this.state.direction !== "up") {
        newDirection = "down";
      }
      // A
      else if (e.keyCode == '65' && this.state.direction !== "right") {
        newDirection = "left";
      }
      // D
      else if (e.keyCode == '68' && this.state.direction !== "left") {
        newDirection = "right";
      }
      this.setState({
        direction: newDirection
      }, () => {
        console.warn(this.state.direction);
      })
    })
  }

  startGame() {
    this.setState({
      direction: false,
      foodSquare: this.generateNewFoodSquare(),
      snakeSquares: [
        {x: 1, y: this.state.boardY - 1},
        {x: 0, y: this.state.boardY - 1}
      ],
    }, () => {
      console.warn(this.state);
    })
    clearInterval(gameTimer);
    gameTimer = setInterval(() => {
      if (this.state.direction) {
        this.advanceSnake();
      }
    }, this.state.gameSpeedMS);
  }
  endGame() {
    console.warn(`Game Over... Your snake got up to ${this.state.snakeSquares.length} squares`);
    clearInterval(gameTimer);
    this.startGame();
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.startGame();
    })
  }
  parseBoard() {
    let board = [];
    for (let y = this.state.boardY - 1; y >= 0; y--) {
      // console.warn(y);
      for (let x = 0; x < this.state.boardX; x++) {
        // console.warn(x, y);
        board.push(this.parseSquareOccupied(x, y));
      }
    }
    return board;
  }
  parseSquareOccupied(x, y) {
    let matchingSquare = this.state.snakeSquares.find((square) => {
      return square.x === x && square.y === y;
    });
    const widthAndHeightPercents = {"width": 100 / this.state.boardX + "%", "height": 100 / this.state.boardY + "%"};
    // console.warn(matchingSquare);
    if (matchingSquare) {
      return (
        <div className="square filled" style={widthAndHeightPercents}></div>
      )
    }
    else if (x === this.state.foodSquare.x && y === this.state.foodSquare.y) {
      return (
        <div className="square food" style={widthAndHeightPercents}></div>
      )
    }
    else {
      return (
        <div className="square" style={widthAndHeightPercents}></div>
      )
    }
  }
  generateNewFoodSquare() {
    let newSquare = {
      x: Math.floor((Math.random() * this.state.boardX)),
      y: Math.floor((Math.random() * this.state.boardY))
    }
    let firstCollidingSquare = this.state.snakeSquares.find((square) => {
      return square.x === newSquare.x && square.y === newSquare.y;
    })
    if (firstCollidingSquare) {
      return this.generateNewFoodSquare();
    }
    else {
      return newSquare
    }
  }
  advanceSnake() {
    let nextSnakeHead = {
      x: this.state.snakeSquares[0].x,
      y: this.state.snakeSquares[0].y
    }
    if (this.state.direction === "up") {
      nextSnakeHead.y++;
    }
    else if (this.state.direction === "down") {
      nextSnakeHead.y--;
    }
    else if (this.state.direction === "left") {
      nextSnakeHead.x--;
    }
    else if (this.state.direction === "right") {
      nextSnakeHead.x++;
    }
    console.warn(this.state.snakeSquares, nextSnakeHead);

    let nextSnakeHeadCollision = this.state.snakeSquares.find((square) => {
      return square.x === nextSnakeHead.x && square.y === nextSnakeHead.y;
    })

    if (nextSnakeHeadCollision) {
      console.error("you lose, collidede with yourself :0");
      this.endGame();
    }
    else if (nextSnakeHead.x < 0) {
      console.error("you lose, went over the left edge of the board");
      this.endGame();
    }
    else if (nextSnakeHead.y < 0) {
      console.error("you lose, went over the bottom edge of the board");
      this.endGame();
    }
    else if (nextSnakeHead.x >= this.state.boardX) {
      console.error("you lose, went over the right edge of the board");
      this.endGame();
    }
    else if (nextSnakeHead.y >= this.state.boardY) {
      console.error("you lose, went over the top edge of the board");
      this.endGame();
    }
    else {
      let newSnakeSquares = this.state.snakeSquares.slice();
      newSnakeSquares.unshift(nextSnakeHead);

      if (nextSnakeHead.y === this.state.foodSquare.y && nextSnakeHead.x === this.state.foodSquare.x) {
        console.warn("gratz you got zee food");
        // TODO ensure new foodSquare isn't already a square occupied by the Snake
        this.setState({
          foodSquare: this.generateNewFoodSquare(),
          snakeSquares: newSnakeSquares
        })
      }
      else {
        newSnakeSquares.pop();
        console.warn(newSnakeSquares);
        this.setState({
          snakeSquares: newSnakeSquares
        })
      }
    }
  }
  

  render() {
    return (
      <main className="game-wrap">
        <h1>Snake!</h1>
        <p>Use W, A, S, D keys to move. Good luck my friend.</p>
        <div className="board">
          {this.parseBoard()}
        </div>
        <label>
          # Columns:
          <input type="number" value={this.state.boardX} name="boardX" onChange={this.handleChange}/>
        </label>
        <label>
          # Rows:
          <input type="number" value={this.state.boardY} name="boardY" onChange={this.handleChange}/>
        </label>
        <label>
          Game Speed (ms):
          <input type="number" value={this.state.gameSpeedMS} name="gameSpeedMS" onChange={this.handleChange}/>
        </label>
      </main>
    )
  };
}

export default SnakeGame;
