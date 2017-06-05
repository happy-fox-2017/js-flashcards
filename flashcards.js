'use strict'
// write your code here

const sqlite3 = require('sqlite3').verbose();
const FlashCardsController = require('./flashcards_controller');

const db = new sqlite3.Database('cards.db');

db.serialize(() => {
  const flashCardsController = new FlashCardsController(db);
  flashCardsController.start();
});

db.close();
