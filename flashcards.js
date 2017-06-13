"use strict"
// write your code here
const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite-sync');
const readlineSync = require('readline-sync');
var db = new sqlite3.Database('./cards.db');
const fs = require('fs');

class Model {
  constructor(input) {
    this.data = this.populate(input);
  }

  populate(input) {
    if(input == undefined) {
      input = "social"
    }
    sqlite.connect('cards.db');
    let rows = sqlite.run(`SELECT * FROM ${input}`);
    return rows;
  }

  skipped(index) {
    let swapped = this.data[index];
    this.data.splice(index, 1);
    this.data.push(swapped);
  }

  correct(index) {
    this.data.splice(index, 1);
  }
}

class Controller {
  constructor() {
    this.argv = process.argv;
    let option = this.argv[2];
    this.model = new Model(option);
    this.view = new View();
    this.data = this.model.data;
    this.wrongAnswer = 0;
    this.welcomeScreen(option);
  }

  welcomeScreen(option) {
    this.view.welcomeScreen(option);
    this.interface();
  }
  
  interface(number = 0) {
    if(this.data.length >= 1) {
      let answer = readlineSync.question(`\n${this.data[number].definition}:\n`)
      answer = answer.toLowerCase();
      let solution = this.data[number].term.toString().toLowerCase();
      
      if(answer == solution) {
        this.model.correct(number);
        if(this.data.length > 0) {
          this.view.correct(this.data.length);
        }
        return this.interface(number);
      } else if(answer == "skip") {
        this.model.skipped(number);
        this.interface(number);
      } else if(answer == "exit") {
        process.exit();
      }else {
        this.wrongAnswer++;
        this.view.wrong(this.wrongAnswer);
        return this.interface(number);
      }
    } else {
      this.view.win();
    }
  }
}

class View {
  constructor() {
    
  }

  welcomeScreen(option) {
    if(option == undefined) 
    option = "social";
    console.log(`Welcome to the game, you have chosen "${option}" questions!`)
    console.log(`\nTo play just enter the correct term for each definition. Ready? Go!`)
  }

  correct(number) {
    console.log(`Jawaban anda benar! Tersisa ${number} pertanyaan lagi`)
  }
  wrong(number) {
    console.log(`Jawaban anda salah, anda sudah salah ${number} kali`)
  }

  win() {
    console.log(`\nCongratulations! You've aced this game!`)
  }
}

let play = new Controller()