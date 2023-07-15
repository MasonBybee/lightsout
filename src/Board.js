import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import Restart from "./Restart";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.33 }) {
  const [board, setBoard] = useState(createBoard());
  const [moves, setMoves] = useState(0);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    // function lightDecider() {
    //   return Math.random() < chanceLightStartsOn ? true : false;
    // }
    for (let i = 0; i < ncols; i++) {
      const row = [];
      for (let i = 0; i < nrows; i++) {
        row.push(false);
      }
      initialBoard.push(row);
    }
    const randBoard = randomize(initialBoard, chanceLightStartsOn);
    return randBoard;
  }

  function flipCellsAround(coord, oldBoard) {
    const [y, x] = coord.split("-").map(Number);

    const flipCell = (y, x, boardCopy) => {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        boardCopy[y][x] = !boardCopy[y][x];
      }
    };
    const deepBoardCopy = JSON.parse(JSON.stringify(oldBoard));
    const adjacent = [
      [y, x],
      [y + 1, x],
      [y - 1, x],
      [y, x + 1],
      [y, x - 1],
    ];

    for (let [adjY, adjX] of adjacent) {
      flipCell(adjY, adjX, deepBoardCopy);
    }
    return deepBoardCopy;
  }

  function clickHandler(coords) {
    setMoves((m) => m + 1);
    setBoard((oldBoard) => {
      return flipCellsAround(coords, oldBoard);
    });
  }

  function randomize(initBoard, chanceLightStartsOn) {
    let newBoard = [...initBoard];
    function randCord() {
      return Math.floor(Math.random() * 5);
    }
    function checkLightsOn(board) {
      let lightsOn = 0;
      const cells = board[0].length * board.length;
      board.map((row) => {
        row.map((cell) => {
          if (cell) {
            lightsOn++;
          }
          return true;
        });
        return true;
      });
      if (
        chanceLightStartsOn - 0.05 < lightsOn / cells &&
        chanceLightStartsOn + 0.05 > lightsOn / cells
      ) {
        return true;
      } else return false;
    }
    let counter = 0;
    while (true) {
      const y = randCord();
      const x = randCord();
      newBoard = flipCellsAround(`${y}-${x}`, newBoard);
      if (counter >= 49 && checkLightsOn(newBoard)) {
        break;
      }
      counter++;
    }
    return newBoard;
  }

  function hasWon(array) {
    const won = array.every((arr) => {
      return arr.every((n) => !n);
    });
    return won;
  }
  function restartGame() {
    setMoves(0);
    setBoard(createBoard());
  }
  if (hasWon(board)) {
    return (
      <div className="Board-winner">
        <h1 className="Board-youwin">You win!!</h1>
        <h4 className="Board-moves">Moves: {moves}</h4>
        <Restart restartGame={restartGame} />
      </div>
    );
  } else {
    return (
      <div className="Board ">
        {board.map((n, y) =>
          n.map((cell, x) => {
            return (
              <Cell
                key={`${y}-${x}`}
                idx={`${y}-${x}`}
                clickHandler={clickHandler}
                isLit={cell}
              />
            );
          })
        )}
        <h3 className="Board-moves">Moves: {moves}</h3>
        <Restart restartGame={restartGame} />
      </div>
    );
  }
}

export default Board;
