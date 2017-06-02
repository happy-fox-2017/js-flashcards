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
  constructor(data) {
    this.data = data
  }
}

class Controller {
  constructor() {
    this.model = new Model()
    this.view = new View()
  }
  
  start() {
    db.serialize(function () {
      let query = `SELECT * FROM social`
      db.all(query, (error, rows) => {
        if (error) {
        } else {
          this.run(rows)
        }
      })
    })
    
  }
  
  run(data) {
    console.log(data);
    let question = data[0].definition
    // rl.question(question, answer => {
    //   if (answer == data[0]) {
    //     data.splice(0,1)
    //     console.log(`congrats ur right`);
    //   } else {
    //     console.log(`sorry you are wrong`);
    //     data.push(data[0])
    //     data.shift()
    //     
    //   }
    // })
  }
  
}

class View {
  constructor() {
    
  }
  
  showQuestion() {
    
  }
}

let control = new Controller()
let model = new Model()
control.start()
// control.model.getData()
// console.log(control.model);