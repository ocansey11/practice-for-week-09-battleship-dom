import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
// console.log(board.grid, board.grid[0]);

window.addEventListener(`DOMContentLoaded`, (event) => {
  let battlefield = document.querySelector(".battlefield");
  let grid = board.grid;
  let tries = document.getElementById("noTries");
  let alertBox = document.querySelector(".alertBox");
  let resetBtn = document.getElementById("resetBtn");
  let resetBtn_gameover = document.querySelector(".resetBtn-gameOver");

  // resetBtn.style.display = "none";

  //Function Load Game. to load and reset grid using values from board
  function loadGame() {
    for (let r = 0; r < 9; r++) {
      let row = document.createElement("div");
      row.setAttribute("data-id", `bfield${r}`);
      row.classList.add("grid-row");

      for (let c = 0; c < 9; c++) {
        let col = document.createElement("div");
        col.setAttribute("data-id", `${r}${c}`);
        col.id = `${r}${c}`;
        col.classList.add("grid-col");

        row.appendChild(col);
      }

      // Append the row to the battlefield
      battlefield.appendChild(row);
    }
    console.log(battlefield);
  }

  //function Make Hit. to add color effect to grid cells via classLists
  function makeHit(row, col) {
    if (grid[row][col] !== null) {
      return true;
    }
    return false;
  }

  //Function Extract Cell. Triggered on event and calls the makeHit method of the board class getting the game closer to game over state
  function extractCell(event) {
    let cellLoc = event.target.attributes[0].value;
    let row = cellLoc[0];
    let col = cellLoc[1];
    let cellElement = document.getElementById(`${cellLoc}`);

    let hit = makeHit(row, col);

    if (hit) {
      event.target.classList.add("makeHit");
      cellElement.innerText = board.makeHit(row, col);
      tries.innerText = `Number of tries remaining: ${board.numRemaining}`;

      if (board.isGameOver()) {
        alertBox.style.display = "block";
        battlefield.removeEventListener("click", extractCell);
      }
    } else {
      event.target.classList.add("makeMiss");
      cellElement.innerText = "ha!";
    }

    // Check to see if Game is Over
  }

  function resetGame() {
    battlefield.innerHTML = "";
    board = new Board();
    grid = board.grid;
    loadGame();
    battlefield.addEventListener("click", extractCell);
    tries.innerText = `Number of tries remaining: ${board.numRemaining}`;
    alertBox.style.display = "none";
  }

  //Calling the functions and eevent listeners

  resetBtn.addEventListener("click", resetGame);
  battlefield.addEventListener("click", extractCell);

  loadGame();
  tries.innerText = `Number of tries remaining: ${board.numRemaining}`;
});
