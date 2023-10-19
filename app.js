const cells = document.querySelectorAll(".cell");
const myMessage = document.getElementById("message");
const resetButton = document.getElementById("reset-button");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

//handle cell click
function cellClick(index) {
  if (gameBoard[index] === "" && gameActive) {
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer);

    if (checkWin()) {
      myMessage.textContent = `${currentPlayer} wins`;
      gameActive = false;
    } else if (gameBoard.every((cell) => cell != "")) {
      myMessage.textContent = "It is a draw";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

//Check for a win
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    ) {
      return true;
    }
  }
  return false;
}

//reset game
function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell, index) => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });

  myMessage.textContent = "";
  currentPlayer = "X";
  gameActive = true;
}

//event listener
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => cellClick(index));
});

resetButton.addEventListener("click", resetGame);
