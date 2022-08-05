//SOUNDS
var correctSound = new Audio()
correctSound.src = "SOUNDS/match.wav"

var incorrectSound = new Audio()
incorrectSound.src = "SOUNDS/gameover.wav"

var winSound = new Audio()
winSound.src = "SOUNDS/victory.wav"

var backgroundMusic = new Audio();
backgroundMusic.src = "SOUNDS/happy.mp3"

window.addEventListener("click", () => {
  if (time == 0){
    backgroundMusic.pause()
  } else if (counter == 10){
    backgroundMusic.pause()
  } else {
    backgroundMusic.play()
    backgroundMusic.volume = 0.05
    backgroundMusic.loop = true
  }
})

//OPENING TIMER
const countdownText = document.getElementById("countdown-text")
const openingCountdown = document.getElementById("opening-counter")

let countdownTime = 5
var countdownInterval = setInterval(function(){
  countdownTime--
  countdownText.innerHTML = countdownTime

  if (countdownTime == 0){
    startGame()
    clearInterval(countdownInterval)
  }
}, 1000)

// To change level
let time = 15
let score = 0
let isPlaying
let counter = 0

function startGame() {
  wordInput.classList.remove("hide")
  currentWord.classList.remove("hide")
  scoreDisplay.classList.remove("hide")
  timeDisplay.classList.remove("hide")
  instructions.classList.remove("hide")
  scoreText.classList.remove('hide')
  timerText.classList.remove('hide')
  titleImage.classList.remove('hide')
  container.classList.remove('hide')
  currentDefinition.classList.remove('hide')
  countdownText.classList.add('hide')
  openingCountdown.classList.add('hide')

  // Load word from array
  showWord(words)
  // Start matching on word input
  wordInput.addEventListener('input', startMatch)
  // Call countdown every second
  setInterval(countdown, 1000)
  // Check game status
  setInterval(checkStatus, 50)
}

// Elements
const wordInput = document.querySelector('#word-input')
const currentWord = document.querySelector('#current-word')
const currentDefinition = document.getElementById("current-definition")
const scoreDisplay = document.querySelector('#score')
const timeDisplay = document.querySelector('#time')
const instructions = document.getElementById('instructions')
const timerText = document.getElementById('timer-text')
const scoreText = document.getElementById('score-text')
const failMessage = document.getElementById('fail-msg')
const titleImage = document.getElementById('title-img')
const container = document.getElementById("container")
const passMessage = document.getElementById("pass-msg")
const menuButton = document.getElementById("menu-btn")

const words = [
  'Creative and Innovative',
  'God-Centered',
  'Socially Responsible',
  'Excellent With Integrity',
  'Inclusive',
  'Live Jesus In Our Hearts',
  'Benildean',
  'St. John Baptist De La Salle',
  'Extraordinarily Well',
  'De La Salle-College of Saint Benilde'
];

const definitions = [
  'Refers to expressing oneself freely through extraordinary work that aims to provide meaningful solutions to social problems.',
  'Refers to having a meaningful belief and relationship with God where life’s work flows from Him towards goodness to self, community, and broader society.',
  'Refers to continuing development of one’s social consciousness in engaging with the community and addressing broader social issues.',
  'Means going beyond what is expected in adherence to ethical standards and principles; practicing moral uprightness.',
  'Refers to appreciating one’s worth and engaging with practices <br> that promote acceptance, accommodation, empowerment, <br> and reaching out to others.',
  'A phrase in our Lasallian Prayer that entails the response ‘Forever’.',
  'A term that refers to students studying at <br> De La Salle-College of Saint Benilde.',
  'The Patron Saint of all those who work in the field of education.',
  'This is the Benildean Motto. <br> "Doing Ordinary Things, _______________ ____!"',
  'A private, Catholic research college run by De La Salle Brothers located in Malate district of Manila, Philippines.'
];

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true
    time = 16;
    showWord(words)
    wordInput.value = ''
    score++
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0
  } else if( score === 10) {
    wordInput.classList.add("hide")
    currentWord.classList.add("hide")
    scoreDisplay.classList.add("hide")
    timeDisplay.classList.add("hide")
    instructions.classList.add("hide")
    scoreText.classList.add('hide')
    timerText.classList.add('hide')
    titleImage.classList.add('hide')
    container.classList.add('hide')
    currentDefinition.classList.add('hide')
    menuButton.classList.remove('hide')
    passMessage.classList.remove('hide')
    backgroundMusic.pause()
    winSound.volume = 0.5
    winSound.play()
  } else {
    scoreDisplay.innerHTML = score
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    correctSound.play()
    counter++
    return true
  } else {
    return false
  }
}

function showWord(words) {
  currentWord.innerHTML = words[counter]
  currentDefinition.innerHTML = definitions[counter]
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    time--
    // Decrement
    if (score === 10){
      time++
    }
  } else if (time < 14) {
    // Game is over
    wordInput.classList.add("hide")
    currentWord.classList.add("hide")
    currentDefinition.classList.add('hide')
    scoreDisplay.classList.add("hide")
    timeDisplay.classList.add("hide")
    instructions.classList.add("hide")
    scoreText.classList.add('hide')
    timerText.classList.add('hide')
    titleImage.classList.add('hide')
    failMessage.classList.remove('hide')
    container.classList.add('hide')
    backgroundMusic.pause()
    incorrectSound.play()
    let incorrectSoundVolume = .5
    incorrectSound.volume = incorrectSoundVolume
    incorrectSound--
  }
  // Show time
  timeDisplay.innerHTML = time
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    score = -1
  }
}