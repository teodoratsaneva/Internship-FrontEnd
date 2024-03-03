export const getStatus = (squares, winner, xIsNext) => {
    const emptySquares = squares.filter(square => square == null);

    return emptySquares.length === 0 ? winner ? `Game over the winner is ${winner}!` 
    : `Game over there is no winner!` : winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');
}

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export const calculateWinner = (squares) => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}