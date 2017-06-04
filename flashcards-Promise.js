"use strict"
// write your code here
const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite-sync');
const readlineSync = require('readline-sync');
var db = new sqlite3.Database('./cards.db');
const fs = require('fs');


class Model {
  constructor(){
    this.filename = "./data.json";
  }
  
  readDB(){
    // ini promise
    // let promise = new Promise(function(resolve, reject){
    //   db.serialize(function (){
    //     let query = "SELECT * FROM social";
    //     db.all(query,(err,rows) =>{
    //       if(!err){
    //         resolve(rows)
    //       } else{
    //         reject(err)
    //       }
    //     })
    //   })
    // })
    // return promise
    sqlite.connect('cards.db');
    let rows = sqlite.run("SELECT * FROM social");
    console.log(rows);
  }
  
}

class View {
  constructor() {
  }
}


class Controller {
  constructor() {
    this.Model = new Model;
    this.View = new View;
  }
  
  run(){
    //ini promise
    // this.Model.readDB()
    // .then(function(data){
    //   
    //   for (var i = 0; i < data.length; i++) {
    //     rl.question(data[i].definition+" ?",(answer) =>{
    //       if(answer == "skip"){
    //         console.log();
    //       }
    //     })
    //   }
    // })
    // .catch()
    this.Model.readDB();
    
  }
}

let ctrl = new Controller();
ctrl.run();