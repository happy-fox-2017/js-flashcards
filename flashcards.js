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
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM social`
      db.all(query, (error, rows) => {
        if (!error) {
          return resolve(rows)
        } else {
          return reject(error)
        }
      })
    })
  }

  run() {

  }

}

class View {
  constructor() {}

  rules() {
    console.log(`You can guess 3 times in one game, more than that.. game over`);
    console.log(`If you can guess all cards, You win`);
    console.log(`You can skip card you dont know`);
  }
}

let control = new Controller()
let model
let i = 0
let guess = 0
control.start().then(rows => {
  let question = rows[i].definition
  rl.setPrompt(`${question} > `);
  rl.prompt();
  rl.on('line', function(line) {
    let answer =  rows[i].term
    if (line == 'skip') {
     let skipQuestion = rows.shift()
     rows.push(skipQuestion)
     question = rows[i].definition
     rl.setPrompt(`${question} > `)
     rl.prompt();
   } else if (line !== `${answer}`) {
      guess++
      console.log(`wrong guess`);
      if (guess === 3) {
        console.log(`game over`);
        rl.close()
      }
      rl.prompt()
    } else {
      rows.splice(i,1)
      console.log('ur rigt');
      if (rows.length === 0) {
        console.log(`You win`);
        rl.close()
      }
      question = rows[i].definition
      rl.setPrompt(`${question} > `)
      rl.prompt();
    }
  }).on('close',function(){
      process.exit(0);
  });
})
// control.model.getData()
// console.log(control.model);
