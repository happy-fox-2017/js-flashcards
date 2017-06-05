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

  start() {
    console.log(`Welcome to the Flash Card Game!`);
    console.log(`Please answer each question correctly, if you need more time to think about it, you may skip it.`);
  }

  correct() {
    console.log(`You're correct! Congratulations!`);
  }
  
  gameOver() {
    console.log(`Game Over!!! go back to your mama!`);
  }

  wrong(wrongCount) {
    if(wrongCount == 2){
      console.log('The Last Chance!');
    }else {
      console.log(`You've made ${wrongCount} mistakes. Better luck next time!`);
    }
  }

  finish(remaining) {
    if (remaining === 0) {
      return console.log(`YOU WIN!! \nThank you for playing!`);
    }
    else{
      return console.log(`Thank you for playing!`);
    }
  }
}

class Controller {
  constructor(category) {
    this.model = new Model(category);
    this.view = new View();
    this.welcome();
  }
  
  welcome(){
    this.view.start();
    this.play();
  }
  
  play(wrongCount = 0) {
    if (this.model.questions.length > 0){
      let term = readlineSync.question(`\n${this.model.questions[0].definition}\n`);
      let answer = this.model.questions[0].term;
      
      if (term == answer.toLowerCase()) {
        this.view.correct();
        this.model.questions.splice(0,1);
        return this.play(wrongCount);
      }
      
      else if (term == "skip") {
        this.model.skip(this.model.questions);
        return this.play(wrongCount);
      }
      
      else if (wrongCount > 1) {
        this.view.gameOver();
      }

      else if (term == "exit") {
        this.view.finish(this.model.questions.length);
      }

      else {
        wrongCount += 1;
        this.view.wrong(wrongCount);
        return this.play(wrongCount);
      }
    }
    else {
      this.view.finish(0);
    }
  }

}

let category = process.argv[2];
let flashCard = new Controller(category);