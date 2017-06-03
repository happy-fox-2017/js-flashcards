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
    console.log(`--------------------------------------------------------------\n`);
    console.log(`  You can guess 3 times in one game, more than that.. game over`);
    console.log(`  If you can guess all cards, You win`);
    console.log(`  You can skip card you dont know, just write 'skip'\n        `);
    console.log(`________________________LET's BEGIN__________________________\n`);

  }
  rightAnswer() {
    console.log(`\n`);
    console.log(`it's correct, awesome !`);
    console.log(`\n`);
  }

  wrongAnswer(guess) {
    console.log(`\n`);
    console.log(`Tetott , wrong answer !`);
    console.log(`You have ${3-guess} chances to go`);
    console.log(`\n`);
  }
  skip() {
    console.log(`\n`);
    console.log(`Skipped`);
    console.log(`next question`);
    console.log(`\n`);
  }
  win() {
    console.log(`&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&`);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    console.log(`                    You WIN !                           `);
    console.log(`                  All hail User                         `);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
  }
  gameOver() {
    console.log(`******************************************************`)
    console.log(`                     GAME OVER                        `);
    console.log(`                     YOU DIED                         `);
    console.log(`>_<>_<>_<>_<>_<>_<>_<>_<>_<>_<>_<>_<>_<>_<>_<>_<>_<>_<`);
  }
}

let deckCard = process.argv[2]
let control = new Controller(deckCard)
control.run()
