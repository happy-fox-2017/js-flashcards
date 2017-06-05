"use strict"

var sqlite = require('sqlite-sync');
sqlite.connect('./cards.db');
const readlineSync = require('readline-sync');


class Model {
  constructor (category='social') {
    this.cat = category;
    this.questions = sqlite.run(`SELECT * FROM ${this.cat}`);
  }

  skip(question){
    let temp = question[0];
    question.splice(0,1);
    question.push(temp);
    return question;
  }
}

class View {
  constructor() {
  }

  printLine(){
    console.log('===========================================================================');
  }

  start() {
    console.log(`Welcome to the Flash Card Game!`);
    this.printLine()
    console.log(`Please answer each question correctly, if you need more time, just skip it.`);
    this.printLine()
  }

  correct() {
    console.log(`You're correct! Congratulations!`);
    this.printLine()
  }

  wrong(count) {
    console.log(`You've made ${count} mistakes. You can skip if you want!`);
    this.printLine()
  }

  finish(remaining) {
    if (remaining === 0) {
      return console.log(`YOU WON!! \n===========================================================================\nThank you for playing!`);
    }
    else{
      return console.log(`Thank you for playing!`);
    }
  }
}

class Controller {
  constructor(option) {
    this.model = new Model(option);
    this.view = new View();
  }

  welcome(){
    this.view.start();
    this.play();
  }

  play(count = 0) {
    if (this.model.questions.length > 0){
      let term = readlineSync.question(`${this.model.questions[0].definition}\n`);
      let regex = new RegExp(this.model.questions[0].term,'i')
      let ans = term.replace(regex, this.model.questions[0].term)

      if (ans == this.model.questions[0].term) {
        this.view.correct();
        this.model.questions.splice(0,1);
        return this.play(count);
      }

      else if (ans == "skip") {
        this.model.skip(this.model.questions);
        return this.play(count);
      }

      else if (ans == "exit") {
        this.view.finish(this.model.questions.length);
      }

      else {
        count += 1;
        this.view.wrong(count);
      return this.play(count);
      }
    }
    else {
      this.view.finish(0);
    }
  }

}

let option = process.argv[2];
let flashCard = new Controller(option);
flashCard.welcome();