"use strict"

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Model {
  constructor(file) {
    this.file = file
  }

  readFile() {
        let fs = require('fs');
        let data = fs.readFileSync(this.file).toString();
        if (data.toString()) {
            data = JSON.parse(data);
        } else {
            data = [];
        }
        return data;
  }

  next(idx, data) {
    return data.splice(idx, 1);
  }
}

class View {
  constructor() {
  }

  menu(deck) {
   console.log('=============================================================')
   console.log(`Welcome to JS Flash Cards, YOU are using the deck "${deck}" `);
   console.log(`To play just enter the correct term for each definition. Ready? Go!`);
  }

  wrongAnswer(count) {
    console.log(`It's INCORRECT!, Try Again!`)
    console.log(`You've already guess ${count} times!`);
  }

  failed(count) {
    console.log('Sorry, YOU LOST!');
    console.log(`You've already guess ${count} times!`);
  }

  correct(count) {
    console.log(`Correct!`)
  }

  finish() {
    console.log("Congratz! YOU WIN!");
  }

  error() {
    console.log("Please input correctly!");
  }

}
class Controller {
  constructor() {
    this.model = new Model('data.json')
    this.data = this.model.readFile()
    this.view = new View(this.data)
  }

  run() {
    this.view.menu("social")
    let idx = 0
    let count = 0
    let countWrong = 0
    let data;
    console.log(this.data[idx].definition);
    rl.on('line', (answer) => {
      if (this.data[idx].term.toLowerCase() === answer.toLowerCase()) {
        this.view.correct(count)
        count++
        idx++
      } else {
        this.view.wrongAnswer(countWrong)
        countWrong++
        if(countWrong >=5) {
          this.view.failed(countWrong)
          rl.close()
        }
      }
      if(countWrong < this.data.length && idx < this.data.length) {
        console.log(this.data[idx].definition);
      } else if (idx >= this.data.length){
        this.view.finish()
        rl.close()
      }
    })
  }
}

let start = new Controller();
start.run();
