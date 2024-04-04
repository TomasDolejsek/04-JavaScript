// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

function pickWord() {
  const words = ['python', 'java', 'swift', 'javascript']
  const index = Math.floor(Math.random() * words.length)
  return words[index]
}

function updateGuessed(word, letter, old) {
  let newGuessed = ''
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      newGuessed += letter
    } else {
      newGuessed += old[i]
    }
  }
  return newGuessed
}

function play() {
  const word = pickWord()
  const picked = []
  let guessed = '-'.repeat(word.length)
  let attempts = 0

  while (attempts < 8) {
    console.log('\n' + guessed)

    let user = input("Input a letter: ")
    if (user.length !== 1) {
      console.log("Please, input a single letter.")
      continue
    }
    if (!/[a-z]/.test(user)) {
      console.log("Please, enter a lowercase letter from the English alphabet.")
      continue
    }

    if (picked.includes(user)) {
      console.log("You've already guessed this letter.")
      continue
    }
    if (!word.includes(user)) {
      console.log("That letter doesn't appear in the word.")
      picked.push(user)
      attempts++
    } else {
      guessed = updateGuessed(word, user, guessed)
      picked.push(user)
    }
    if (guessed === word) {
      break
    }
  }

  if (guessed === word) {
    console.log(`You guessed the word ${word}!`)
    console.log('You survived!')
    wins++
  } else {
    console.log(`\nYou lost!`)
    losts++
  }
}

console.log("H A N G M A N ")
let wins = 0
let losts = 0
let menu = null

while (menu !== 'exit') {
  menu = input('Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: ')
  switch (menu) {
    case 'play':
      play()
      break
    case 'results':
      console.log(`You won: ${wins} times.`)
      console.log(`You lost: ${losts} times.`)
      break
  }
}
