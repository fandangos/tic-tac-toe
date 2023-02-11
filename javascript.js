const DOM = (() => {
  // Here we cache the DOM once for performance
  const spots = document.querySelectorAll(".marks");
  const spotBtn = document.querySelectorAll(".spotBtn");
  const playerScore = document.getElementById("playerScore");
  const cpuScore = document.getElementById("cpuScore");
  const settings = document.getElementById("settings");
  const settingsText = document.getElementById("settingsText");
  const startBtn = document.getElementById("settingsBtn");
  const result = document.getElementById("result");
  const againBtn = document.getElementById("playAgain");
  const resultText = document.getElementById("resultText");

  playerScore.textContent = "Player: 0";
  cpuScore.textContent = "CPU: 0";
  const input = {};

  spotBtn.forEach((btn) => {
    btn.addEventListener("mousedown", (event) => {
      btn.style.transform = "scale(0.9)";
      playerAction(event);
    });
  });

  spotBtn.forEach((btn) => {
    btn.addEventListener("touchstart", (event) => {
      btn.style.transform = "scale(0.9)";
      playerAction(event);
    });
  });

  spotBtn.forEach((btn) => {
    btn.addEventListener("mouseup", (event) => {
      btn.style.transform = "none";
    });
  });

  spotBtn.forEach((btn) => {
    btn.addEventListener("touchend", (event) => {
      btn.style.transform = "none";
    });
  });

  againBtn.addEventListener("mousedown", (event) => {
    againBtn.style.transform = "scale(0.9)";
    gameBoard.reset();
  });

  againBtn.addEventListener("mouseup", (event) => {
    againBtn.style.transform = "none";
  });

  againBtn.addEventListener("touchstart", (event) => {
    againBtn.style.transform = "scale(0.9)";
    gameBoard.reset();
  });

  againBtn.addEventListener("touchend", (event) => {
    againBtn.style.transform = "none";
  });

  function handleInput(event) {
    input[event.name] = event.value;
  }

  startBtn.addEventListener("mousedown", (event) => {
    againBtn.style.transform = "scale(0.9)";
    if (input.name === undefined) {
      input.name = "Player";
    }
    DOM.playerScore.textContent = `${input.name}: ${gameBoard.playerScore}`;
    hideSettingsPopUp();
  });

  startBtn.addEventListener("touchstart", (event) => {
    againBtn.style.transform = "scale(0.9)";
    if (input.name === undefined) {
      input.name = "Player";
    }
    DOM.playerScore.textContent = `${input.name}: ${gameBoard.playerScore}`;
    hideSettingsPopUp();
  });

  return {
    spots,
    spotBtn,
    playerScore,
    cpuScore,
    againBtn,
    settings,
    settingsText,
    handleInput,
    input,
    startBtn,
    result,
    resultText,
  };
})();

const gameBoard = (() => {
  board = [];
  board.length = 9;
  let playerScore = 0;
  let cpuScore = 0;
  let gameOver = false;
  showSettingsPopUp();

  const reset = () => {
    // Set all values of the array to undefined
    // so we can render a blank board
    for (let i = 0; i < gameBoard.board.length; i++) {
      gameBoard.board[i] = undefined;
    }
    gameBoard.gameOver = false;
    renderBoard.render();
    hideResultPopUp();
  };

  return {
    playerScore,
    cpuScore,
    board,
    reset,
  };
})();

function showSettingsPopUp() {
  DOM.settings.style.opacity = "1";
  DOM.settings.style.width = "70%";
  DOM.settings.style.height = "70%";
  DOM.settings.style.transition = "height 1s, width 1s, opacity 0s";
  DOM.settingsText.style.display = "grid";
  DOM.startBtn.style.display = "grid";
}

function hideSettingsPopUp() {
  DOM.settings.style.opacity = "0";
  DOM.settings.style.width = "0";
  DOM.settings.style.height = "0";
  DOM.settings.style.transition = "height 1s, width 1s, opacity 1s";
  DOM.settingsText.style.display = "none";
  DOM.startBtn.style.display = "none";
}

function showResultPopUp() {
  DOM.result.style.opacity = "1";
  DOM.result.style.width = "70%";
  DOM.result.style.height = "70%";
  DOM.result.style.transition = "height 1s, width 1s, opacity 0s";
  DOM.resultText.style.display = "inline-block";
  DOM.againBtn.style.display = "inline-block";
}

function hideResultPopUp() {
  DOM.result.style.opacity = "0";
  DOM.result.style.width = "0";
  DOM.result.style.height = "0";
  DOM.result.style.transition = "height 1s, width 1s, opacity 1s";
  DOM.resultText.style.display = "none";
  DOM.againBtn.style.display = "none";
}

const renderBoard = (() => {
  // This render loop will draw every content from the array
  // into each button as a text.
  const render = () => {
    for (let i = 0; i < gameBoard.board.length; i++) {
      DOM.spotBtn[i].textContent = gameBoard.board[i];
    }
  };

  return { render };
})();

// prettier-ignore
const whoWon = (() => {
  const winner = () => {
    for (let i = 0; i < gameBoard.board.length; i++) {
      if (
        (gameBoard.board[i] === "X" &&
         gameBoard.board[i + 1] === "X" &&
         gameBoard.board[i + 2] === "X") ||
        (gameBoard.board[i] === "X" &&
         gameBoard.board[i + 3] === "X" &&
         gameBoard.board[i + 6] === "X") ||
        (gameBoard.board[i + 1] === "X" &&
         gameBoard.board[i + 4] === "X" &&
         gameBoard.board[i + 7] === "X") ||
        (gameBoard.board[i + 2] === "X" &&
         gameBoard.board[i + 5] === "X" &&
         gameBoard.board[i + 8] === "X") ||
        (gameBoard.board[i] === "X" &&
         gameBoard.board[i + 4] === "X" &&
         gameBoard.board[i + 8] === "X") || 
        (gameBoard.board[i + 2] === "X" &&
         gameBoard.board[i + 4] === "X" &&
         gameBoard.board[i + 6] === "X")
      ) {
        if (
          // Make sure spots marked as a sequence but in different
          // lines don't result in player
          (i !== 1 && i + 1 !== 2 && i + 2 !== 3) &&
          (i !== 2 && i + 1 !== 3 && i + 2 !== 4) &&
          (i !== 4 && i + 1 !== 5 && i + 2 !== 6) &&
          (i !== 5 && i + 1 !== 6 && i + 2 !== 7)
        ) {
          gameBoard.playerScore += 1;
          gameBoard.gameOver = true;
          DOM.playerScore.textContent = `${DOM.input.name}: ${gameBoard.playerScore}`;
          DOM.resultText.textContent = "Congratulations! \r\n";
          DOM.resultText.textContent += "You won!"
          showResultPopUp();
        }
      }

      else if (
        (gameBoard.board[i] === "O" &&
         gameBoard.board[i + 1] === "O" &&
         gameBoard.board[i + 2] === "O") ||
        (gameBoard.board[i] === "O" &&
         gameBoard.board[i + 3] === "O" &&
         gameBoard.board[i + 6] === "O") ||
        (gameBoard.board[i + 1] === "O" &&
         gameBoard.board[i + 4] === "O" &&
         gameBoard.board[i + 7] === "O") ||
        (gameBoard.board[i + 2] === "O" &&
         gameBoard.board[i + 5] === "O" &&
         gameBoard.board[i + 8] === "O") ||
        (gameBoard.board[i] === "O" &&
         gameBoard.board[i + 4] === "O" &&
         gameBoard.board[i + 8] === "O") || 
        (gameBoard.board[i + 2] === "O" &&
         gameBoard.board[i + 4] === "O" &&
         gameBoard.board[i + 6] === "O")
      ) {
        if (
          // Make sure spots marked as a sequence but in different
          // lines don't result in player
          (i !== 1 && i + 1 !== 2 && i + 2 !== 3) &&
          (i !== 2 && i + 1 !== 3 && i + 2 !== 4) &&
          (i !== 4 && i + 1 !== 5 && i + 2 !== 6) &&
          (i !== 5 && i + 1 !== 6 && i + 2 !== 7)
        ) {
          gameBoard.cpuScore += 1;
          gameBoard.gameOver = true;
          DOM.cpuScore.textContent = `CPU: ${gameBoard.cpuScore}`;
          DOM.playerScore.textContent = `${DOM.input.name}: ${gameBoard.playerScore}`;
          DOM.resultText.textContent = "Too bad! \r\n";
          DOM.resultText.textContent += "You lost!";
          showResultPopUp();
        }
      } 
    }
    if (!gameBoard.board.includes(undefined) && !gameBoard.gameOver) {
      // make sure there are no more undefined values in the array
      // and make sure the game did not end with a winner before
      gameBoard.gameOver = true;
      DOM.resultText.textContent = "Nobody won! \r\n";
      DOM.resultText.textContent += "It's a draw!";
      showResultPopUp();
    }
  };

  return { winner };
})();

const playerAction = (event) => {
  let e = event.target.id;
  if (gameBoard.board[e] === undefined && !gameBoard.gameOver) {
    gameBoard.board[e] = "X";
    DOM.spotBtn[e].style.color = "blue";
    whoWon.winner();
    if (gameBoard.board.includes(undefined) && !gameBoard.gameOver) {
      cpuAction(getRandom());
    }
    renderBoard.render();
  }
};

function getRandom() {
  return Math.floor(Math.random() * gameBoard.board.length);
}

function cpuAction(spot) {
  if (gameBoard.board[spot] === undefined) {
    gameBoard.board[spot] = "O";
    DOM.spotBtn[spot].style.color = "red";
  } else {
    cpuAction(getRandom());
  }
}
