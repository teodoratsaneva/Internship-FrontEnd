import { useState } from 'react';

const Square = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

const Board = ({ xIsNext, squares, onPlay }) => {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = diplayStatus(squares, winner, xIsNext);

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
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

const diplayStatus = (squares, winner, xIsNext) => {
    let filledArray = squares.filter(value => value == null);

  if(filledArray.length === 0)
    {
        return winner ? `Game over the winner is ${winner}!` : `Game over there is no winner!`;
        
    } else if (winner) {
        return 'Winner: ' + winner;
    } else {
        return 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}


export default Game;