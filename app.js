// These are the globasl variables that will be needed for later
const phrase = document.getElementById('phrase');
const startGame = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const qwerty = document.querySelectorAll('.keyrow button');
let hearts = document.querySelectorAll('.tries img');
let missed = 0;

// The array of phrases
const phrases = [
  'A Dream of Spring',
  'Winds of Winter',
  'A Clash of Kings',
  'Cars are fun',
  'The market is a bubble'
];

// An event must be added for the game to start upon clicking the startGame button
startGame.addEventListener('click', (e) => {
  overlay.style.display = 'none';
});

// Fetches a random string from the array
const getRandomPhrasesAsArray = (phrases) => {
  const randomString = phrases[Math.floor(Math.random() * phrases.length)];
  const letters = randomString.split('');
  return letters;
};

// Displays the random string that was fetched and displays it
const addPhraseToDisplay = arr => {
  for ( let i = 0; i < arr.length; i++ ) {
    const text = arr[i];
    const ul = document.querySelector('#phrase ul');
    const li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = text;
    if (arr[i] !== ' ') {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
  }
}

const phraseArray = getRandomPhrasesAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Checking if user's input was correct and displaying it if it was
const checkLetter = userGuess => {
  const letters = document.getElementsByClassName('letter');
  let correctGuess = null;
  for ( let i = 0; i < letters.length; i++ ) {
    if (userGuess === letters[i].innerText.toLowerCase()) {
      letters[i].className = 'letter show';
      correctGuess = letters[i].innerText;
    }
  }
return correctGuess;
}

// The buttons displayed need an eventListener in order to function, a loop was created to go through them
// It is also important that users should not be able to choose the same letter twice, and a lostHeart is added upon an incorrect guess and the missed variable is added to
for ( let i = 0; i < qwerty.length; i++ ) {
  qwerty[i].addEventListener('click', (e) => {
    let userGuess = e.target.innerText;
    checkLetter(userGuess);
    e.target.className += 'chosen';
    e.target.disabled = 'true';
    let correctLetter = checkLetter(userGuess);
    if (correctLetter === null) {
      hearts[missed].src='images/lostHeart.png';
      missed++;
    }
    checkWin();

  });




}
// This function compares the li elements in order to see if they are the same length, if they are, the user wins
const checkWin = () => {
  let correctNum = document.querySelectorAll('.show').length;
  let numLeft = document.querySelectorAll('.letter').length;
  const title = document.querySelector('.title');
  if (correctNum === numLeft) {
    overlay.className = 'win';
    overlay.style.display = 'flex';
// I do not remember if the course covered this or is yet to, but I learned it is usually better to use textContent instead of innerHTML for security reasons. I will try to avoid innerHTML as a habit
    title.textContent = "You've won!";

  }
  // If the user has incorrectly guessed 5 times, the game ends with a loss
  else if (missed >= 5) {
    overlay.className = 'lose';
    overlay.style.display = 'flex';
    title.textContent = 'You have lost';

  }
};
