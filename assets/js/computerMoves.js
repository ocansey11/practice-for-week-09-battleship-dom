export function computerMoves() {
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
      alertBox.innerHTML += userWins;
      battlefieldCom.removeEventListener("click", extractCell);
    }
  } else {
    cellElement.classList.add("makeMiss");
    cellElement.innerText = "ha!";
  }

  //add or remove event listeners
  battlefield.addEventListener("click", extractCell);
  startCom.removeEventListener("click", computerMoves);
}
