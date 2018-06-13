/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if they lose
- Let player choose to play again
*/

// Create game values
let min = 1,
    max = 10,
    winningNumber = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// button event listener
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  console.log(guess);
  // Validate input
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Enter a number between ${min} and ${max}`, 'red');
  }
  // Check if won
  if(guess === winningNumber){
    gameOver(true, `${winningNumber} is correct! You Win!`);
  } else {
    guessesLeft -= 1;
    if(guessesLeft === 0){
      // Game over - lost
      gameOver(false, `You lost! Game Over! Correct number was: ${winningNumber}`);
    } else {
      // Game continues - guess wrong
      guessInput.style.borderColor = 'red';
      setMessage(`${guess} was incorrect, ${guessesLeft} guesses left.`, 'red');
      guessInput.value = '';
    }
  }
});

// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}

// Game over function
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);
  guessBtn.value = 'Play Again?';
  guessBtn.className += 'play-again';
}

function getRandomNum(min, max){
  return Math.floor(Math.random() *(max - min+1)+ min);
}