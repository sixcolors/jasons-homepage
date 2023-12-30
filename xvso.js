const squares = document.querySelectorAll(".square");
const result = document.querySelector(".result");
const resetBtn = document.querySelector(".reset");
const aiMoveBtn = document.querySelector(".ai-move");
let currentPlayer = "X";
let winner = null;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (const square of squares) {
    square.addEventListener("click", function () {
        if (!square.textContent && !winner) {
            square.textContent = currentPlayer;
            checkWinner();
            if (!winner) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                result.textContent = `It's ${currentPlayer}'s turn`;
            }
        }
    });
}

resetBtn.addEventListener("click", reset);
aiMoveBtn.addEventListener("click", makeAIMove);

function checkWinner() {
    const squareValues = [];
    for (const square of squares) {
        squareValues.push(square.textContent);
    }

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (squareValues[a] && squareValues[a] === squareValues[b] && squareValues[b] === squareValues[c]) {
            winner = squareValues[a];
            break;
        }
    }

    if (!winner && squareValues.every(val => val)) {
        result.textContent = "It's a cat's game";
        winner = true; // cat won
        return;
    }

    if (winner) {
        result.textContent = `${winner} wins!`;
    }
}

function reset() {
    for (const square of squares) {
        square.textContent = "";
    }
    winner = null;
    currentPlayer = "X";
    result.textContent = `It's X's turn`;
}

/*
AI Move Function:

This function employs a heuristic algorithm to determine the optimal move for the AI. The algorithm follows these steps in order:

1. Check for a winning move for the AI.
2. If no winning move, check for a winning move for the opponent and block it.
3. If no blocking move, take the center square if it's free.
4. If the center is not free, take a corner square if available.
5. If no corners are free, make a random move.

This algorithm provides a level of difficulty between easy and medium.

For comparison, "X Versus O" by X2 Studios (which I wrote) uses different algorithms:
- Easy: Similar to this algorithm, but occasionally misses opportunities to win or block an opponent's win.
- Medium: Employs a scoring system to determine the best move.
- Hard: Uses a weighted selection between the following strategies:
  - Minimax with Alpha-beta pruning (for tic-tac-toe, this plays a perfect game),
  - The Intermediate algorithm,
  - The Beginner algorithm, but with a higher likelihood to take a winning move or block an opponent's win.
Link: https://www.x2studios.com/mobile.html
*/
function makeAIMove() {
    // Check if game is over
    if (winner) {
        return;
    }

    const squareValues = [];
    for (const square of squares) {
        squareValues.push(square.textContent);
    }

    // Check for AI win or block opponent's win
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if ((squareValues[a] === squareValues[b] && !squareValues[c] && squareValues[a]) ||
            (squareValues[a] === squareValues[c] && !squareValues[b] && squareValues[a]) ||
            (squareValues[b] === squareValues[c] && !squareValues[a] && squareValues[b])) {
            squares[!squareValues[a] ? a : !squareValues[b] ? b : c].textContent = currentPlayer;
            checkWinner();
            if (!winner) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                result.textContent = `It's ${currentPlayer}'s turn`;
            }
            return;
        }
    }

    // Take the center if it's free
    if (!squareValues[4]) {
        squares[4].textContent = currentPlayer;
        checkWinner();
        if (!winner) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            result.textContent = `It's ${currentPlayer}'s turn`;
        }
        return;
    }

    // Next priority positions: corners
    const priorityPositions = [0, 2, 6, 8];

    for (const position of priorityPositions) {
        if (!squareValues[position]) {
            squares[position].textContent = currentPlayer;
            checkWinner();
            if (!winner) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                result.textContent = `It's ${currentPlayer}'s turn`;
            }
            return;
        }
    }

    // If no other move is found, make a random move
    const emptySquares = [];
    for (let i = 0; i < squareValues.length; i++) {
        if (!squareValues[i]) {
            emptySquares.push(i);
        }
    }

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const randomSquare = emptySquares[randomIndex];
    squares[randomSquare].textContent = currentPlayer;
    checkWinner();
    if (!winner) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        result.textContent = `It's ${currentPlayer}'s turn`;
    }

    return;
}