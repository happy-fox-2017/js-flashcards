const FlashCardsModel = require('./flashcards_model');
const FlashCardsView = require('./flashcards_view');

const FlashCardsDataService = FlashCardsModel.FlashCardsDataService;

const DEFAULT_TABLE = 'social';

class FlashCardsController {

  constructor(db) {
    this.flashCardsDataService = new FlashCardsDataService(db);
    this.flashCardsView = new FlashCardsView(this);
  }

  start(deck = DEFAULT_TABLE) {
    this.flashCardsDataService.getCards(deck, (result) => {
      this.flashCardsView.showFlashCard(result[0]);
    });
  }

  onAnswer(answer) {
    console.log(answer);
  }

}

module.exports = FlashCardsController;
