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
        {x: 5, y: 5},
        {x: 4, y: 5}
      ],
      foodSquare: {x: 7, y: 4},
      direction: "up"
    }
  }
  componentDidMount() {
    this.startGame();
    document.addEventListener("keydown", (e) => {
      console.warn(e.keyCode);
      let newDirection = this.state.direction;
      if (e.keyCode == '38' && this.state.direction !== "down") {
        newDirection = "up";
      }
      else if (e.keyCode == '40' && this.state.direction !== "up") {
        newDirection = "down";
      }
      else if (e.keyCode == '37' && this.state.direction !== "right") {
        newDirection = "left";
      }
      else if (e.keyCode == '39' && this.state.direction !== "left") {
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
    gameTimer = setInterval(() => {
      this.advanceSnake();
    }, 1000)
  }
  endGame() {
    console.warn(gameTimer);
    clearInterval(gameTimer);
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
        <div className="square filled" style={widthAndHeightPercents}>{x}, {y}</div>
      )
    }
    else if (x === this.state.foodSquare.x && y === this.state.foodSquare.y) {
      return (
        <div className="square food" style={widthAndHeightPercents}>{x}, {y}</div>
      )
    }
    else {
      return (
        <div className="square" style={widthAndHeightPercents}>{x}, {y}</div>
      )
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
          foodSquare: {
            x: Math.floor((Math.random() * this.state.boardX)),
            y: Math.floor((Math.random() * this.state.boardY))
          },
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
      <div className="board">
        {this.parseBoard()}
      </div>
    )
  };
}

export default SnakeGame;
