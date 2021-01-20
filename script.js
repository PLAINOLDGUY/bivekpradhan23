'use strict';
const player0Background = document.querySelector('.player--0');
const player1Background = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const scoreEl0 = document.querySelector('#current--0');
const scoreEl1 = document.querySelector('#current--1');

//converting score to zero by selecting Elements
score0El.textContent = 0;
score1El.textContent = 0;

//no need to add equals when adding the hidden class
diceEL.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

const intialization = function () {
  scores = [0, 0];
  currentScore = 0; //current score is displayed outside the function
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  diceEL.classList.add('hidden');
  player0Background.classList.remove('player--winner');
  player1Background.classList.remove('player--winner');
  player1Background.classList.remove('player--active');
  player0Background.classList.add('player--active');
};
intialization();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Background.classList.toggle('player--active');
  player1Background.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generate a random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display the number in dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    //3.check for roll 1
    if (dice !== 1) {
      //add current score
      currentScore += dice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if player socre is >=100 .Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //3.switch player()
    else switchPlayer();
  }
});

//reseting the game
btnNew.addEventListener('click', intialization);
