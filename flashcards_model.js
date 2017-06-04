class FlashCard {
  constructor(definition, term) {
    this._definition = definition;
    this._term = term;
    this._answer = null;
  }

  get definition() {
    return this._definition;
  }

  set answer(answer) {
    this._answer = answer;
  }

  checkAnswer() {
    return this._term.toUpperCase() === this._answer.toUpperCase();
  }
}

class FlashCardsDataService {
  constructor(db) {
    this._db = db;
  }

  getCards(deck, callback) {
    this._db.all(`SELECT * FROM ${deck}`, (err, rows) => {
      const result = rows.map((row) => {
        const flashCard = new FlashCard(row.definition, row.term);
        return flashCard;
      });
      callback(result);
    });
  }
}

module.exports = {
  FlashCard,
  FlashCardsDataService,
};
