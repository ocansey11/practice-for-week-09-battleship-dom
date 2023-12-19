import Board from "./board.js";
import HumanBoard from "./human.js";

let board = new Board(); // creates a new game board
let humanBoard = new HumanBoard(); //creates a new game for human interactivity board

window.addEventListener(`DOMContentLoaded`, (event) => {
  //Declaring classes and Ids
  //Com appended to anything means computer
  let battlefield = document.querySelector(".battlefield");
  let grid = board.grid;
  let noShipsLeft = document.getElementById("noShipsLeft");
  let alertBox = document.querySelector(".alertBox");
  let resetBtn = document.getElementById("resetBtn");
  let resetBtn_gameover = document.querySelector(".resetBtn-gameOver");
  let start = document.querySelector("start");

  //the battlefieldCom refers to the board the computer will be interacting with. the Humans Board
  let battlefieldCom = document.querySelector(".battlefield-com");
  let gridCom = humanBoard.grid;
  let noShipsLeftCom = document.getElementById("noShipsLeft-com");
  let startCom = document.getElementById("startCom");
  let possibleMoves = [];
  let turn = true;

  //Function Load Game. to load and reset grid using values from board
  //Now we have to load the battlefieldCom (Humans board here too)
  function loadGame() {
    for (let r = 0; r < 9; r++) {
      //I need to load the grid for both Human Board and Computer Board
      //Things to note. Human Board is also what i refer to as 'BattlefiedCom'.
      //and the normal board (the computers board) is the 'battlefield'

      let row = document.createElement("div");
      let rowHuman = document.createElement("div");

      row.setAttribute("data-id", `bfield${r}`);
      row.classList.add("grid-row");

      rowHuman.setAttribute("data-id", `bfieldCom${r}`);
      rowHuman.classList.add("grid-row");

      for (let c = 0; c < 9; c++) {
        let col = document.createElement("div");
        let colHuman = document.createElement("div");

        col.id = `${r}${c}`;
        col.classList.add("grid-col");
        //put all generated cells into possibleMoves
        possibleMoves.push(col.id);

        colHuman.id = `${r}${c}+`; //humanBoard cells
        colHuman.classList.add("grid-col");

        row.appendChild(col);
        rowHuman.appendChild(colHuman);
      }

      // Append the row to the battlefield
      battlefield.appendChild(row);
      battlefieldCom.appendChild(rowHuman);
    }
  }

  //Function Extract Cell. When i click on a either grids human board or board. I want to capture the cell value. if null its a miss.
  //if theres a ship [2,3,4,5] its a hit
  //human board has plus (+) sign at the end of the row-col pair value.
  function extractCell(event) {
    let cellLoc = event.target.attributes[0].value;

    // depending on how many strings the CellLoc have we can distinguish between battlefieldCom(human board) and battlefield(board)
    //battlefieldCom has 3 strings. the row the col and an extra + string. while battlefield has just row and col
    let row = cellLoc[0];
    let col = cellLoc[1];
    let comChecker = cellLoc[2];

    let cellElement = document.getElementById(`${cellLoc}`);

    // if (comChecker === "+") {
    //   if (gridCom[row][col] !== null) {
    //     event.target.classList.add("makeHit");
    //     cellElement.innerText = humanBoard.makeHit(row, col);
    //     noShipsLeftCom.innerText = `Number of Ships remaining: ${humanBoard.numRemaining}`;

    //     //Will have to change this part to Human wins
    //     if (humanBoard.isGameOver()) {
    //       alertBox.style.display = "block";
    //       battlefieldCom.removeEventListener("click", extractCell);
    //     }
    //   } else {
    //     event.target.classList.add("makeMiss");
    //     cellElement.innerText = "ha!";
    //   }
    // }

    if (comChecker === undefined) {
      if (grid[row][col] !== null) {
        event.target.classList.add("makeHit");
        cellElement.innerText = board.makeHit(row, col);
        noShipsLeft.innerText = `Number of Ships remaining: ${board.numRemaining}`;

        if (board.isGameOver()) {
          alertBox.style.display = "block";
          battlefield.removeEventListener("click", extractCell);
        }
      } else {
        event.target.classList.add("makeMiss");
        cellElement.innerText = "ha!";
      }
    }

    //remove the eventlistener until the computer makes their move
    battlefield.removeEventListener("click", extractCell);
    //put a timeout here to make it loook like the computer is thinking. it could be varying timeout.
    setTimeout(() => {
      computerMoves();
    }, 1500);
  }

  function computerMoves() {
    let index = Math.floor(Math.random() * possibleMoves.length);
    let move = possibleMoves[index];
    possibleMoves.splice(index, 1);

    //Play
    let row = move[0];
    let col = move[1];
    let cellElement = document.getElementById(`${move[0]}${move[1]}+`);

    if (gridCom[row][col] !== null) {
      cellElement.classList.add("makeHit");
      cellElement.innerText = humanBoard.makeHit(row, col);
      noShipsLeftCom.innerText = `Number of Ships remaining: ${humanBoard.numRemaining}`;
      //i have to create two alertboxes
      if (humanBoard.isGameOver()) {
        alertBox.style.display = "block";
        battlefieldCom.removeEventListener("click", extractCell);
      }
    } else {
      cellElement.classList.add("makeMiss");
      cellElement.innerText = "ha!";
    }

    battlefield.addEventListener("click", extractCell);
  }

  function resetGame() {
    location.reload();
  }

  //Calling the functions and eevent listeners
  resetBtn.addEventListener("click", resetGame);
  battlefield.addEventListener("click", extractCell);
  // battlefieldCom.addEventListener("click", extractCell);

  loadGame();
  noShipsLeft.innerText = `Number of ships remaining: ${board.numRemaining}`;
  noShipsLeftCom.innerText = `Number of Ships remaining: ${humanBoard.numRemaining}`;
  resetBtn_gameover.addEventListener("click", resetGame);
  startCom.addEventListener("click", computerMoves);

  console.log(possibleMoves);
});
