"use strict"
// write your code here

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./cards.db')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

class Model {
  constructor(deck=`social`) {
    this.deck = deck
  }

  getData() {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM ${this.deck}`
      db.all(query, (error, rows) => {
        if (!error) {
          return resolve(rows)
        } else {
          return reject(error)
        }
      })
    })
  }
}

class Controller {
  constructor(deck='social') {
    this.deck = deck
  }

  run() {
    let deck = this.deck
    let view = new View()
    let model = new Model(deck)
    model.getData().then(questions => {
      view.rules()
      let order = 0
      let guess = 0
      let question = questions[order].definition

      rl.setPrompt(`${question} > `);rl.prompt();
      rl.on('line', (input) => {
        input = input.toLowerCase().trim()
        let answer =  questions[order].term.toLowerCase().trim()
        if (input == 'skip') {
          view.skip()
          let skipQuestion = questions.shift()
          questions.push(skipQuestion)
          question = questions[order].definition
          rl.setPrompt(`${question} > `)
          rl.prompt();
        } else if (input !== `${answer}`) {
          guess++
          view.wrongAnswer(guess)
          if (guess === 3) {
            view.gameOver()
            rl.close()
          }
          rl.prompt()
        } else {
          questions.splice(order,1)
          view.rightAnswer()
          if (questions.length === 0) {
            view.win()
            rl.close()
          }
          question = questions[order].definition
          rl.setPrompt(`${question} > `)
          rl.prompt();
        }
      }).on('close',function(){
          process.exit(0);
      });
    })
  }

}

class View {
  constructor() {}

  rules() {
    console.log('🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰');
    console.log('                Let us play a game, shall we?'              );
    console.log('Answer all questions, you win. Otherwise, 3 mistakes, over!');
    console.log('                     Stuck? Try to skip'                    );
    console.log('🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰🀰');

  }
  rightAnswer() {
    console.log(`✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩`);
    console.log(`Atta boy! You correct! `);
    console.log(`✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩✩`);
  }

  wrongAnswer(guess) {
    console.log(`✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎`);
    console.log(`Not quite sure, mate. You got it wrong!`);
    console.log(`${3-guess} chances to go, mate         `);
    console.log(`✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎✖︎`);
  }
  skip() {
    console.log(`◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎`);
    console.log(`See you again`);
    console.log(`Skip to the next question, shall we?`);
    console.log(`◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎◻︎`);
  }
  win() {
    console.log('﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆');
    console.log('﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅');
    console.log('           Man, you are awesome!☻         ');
    console.log('                 YOU WON!                 ');
    console.log('﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆﹆');
    console.log('﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅﹅');
  }
  gameOver() {
    console.log('⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇');
    console.log('⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉');
    console.log('               No good, mate              ');
    console.log('                 YOU LOSE!                ');
    console.log('⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉⚉');
    console.log('⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇⚇');
  }
}

let deckCard = process.argv[2]
let control = new Controller(deckCard)
control.run()