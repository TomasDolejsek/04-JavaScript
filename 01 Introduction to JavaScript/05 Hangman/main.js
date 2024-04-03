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

console.log("H A N G M A N ")
const word = pickWord()
let guessed = '-'.repeat(word.length)
let attempts = 0

while (attempts < 8) {
  attempts++
  console.log('\n' + guessed)
  let user = input("Input a letter: ")
  if (!word.includes(user)) {
    console.log("That letter doesn't appear in the word.")
  } else {
    guessed = updateGuessed(word, user, guessed)
  }
}

console.log("Thanks for playing!")