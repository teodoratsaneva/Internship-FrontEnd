import { useState } from 'react';
import { calculateWinner, getStatus } from './Utils';

const Square = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

const Board = ({ xIsNext, squares, onPlay }) => {
  function handleClick(squareIndex) {
    if (calculateWinner(squares) || squares[squareIndex]) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[squareIndex] = 'X';
    } else {
      nextSquares[squareIndex] = 'O';
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = getStatus(squares, winner, xIsNext);

  const boardRows = [];
  for (let row = 0; row < 3; row++) {

    const squaresInRow = [];

    for (let col = 0; col < 3; col++) {
      const squareIndex = row * 3 + col;

      squaresInRow.push(
        <Square key={squareIndex} value={squares[squareIndex]} onSquareClick={() => handleClick(squareIndex)} />
      );
    }

    boardRows.push(<div key={row} className="board-row">{squaresInRow}</div>);
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currtentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currtentMove];
  const xIsNext = currtentMove % 2 === 0 ;

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currtentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";

    return (
        <li key = {move}>
            {currtentMove === move ? (
          <div>{description}</div>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
        </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul>
        <li>{moves}</li>
        </ul>
      </div>
    </div>
  );
}

export default Game;