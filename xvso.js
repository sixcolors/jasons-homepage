const squares = document.querySelectorAll(".square");
const result = document.querySelector(".result");
const resetBtn = document.querySelector(".reset");
let currentPlayer = "X";
let winner = null;

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

function checkWinner() {
    const squareValues = [];
    for (const square of squares) {
        squareValues.push(square.textContent);
    }

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

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (squareValues[a] === squareValues[b] && squareValues[b] === squareValues[c]) {
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
