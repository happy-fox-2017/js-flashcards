const FlashCardsModel = require('./flashcards_model');
const FlashCardsView = require('./flashcards_view');

const FlashCardsDataService = FlashCardsModel.FlashCardsDataService;

const DEFAULT_TABLE = 'social';
const GUESS_LIMIT = 3;

class FlashCardsController {

  constructor(db) {
    this.flashCardsDataService = new FlashCardsDataService(db);
    this.flashCardsView = new FlashCardsView(this);
    this.flashCards = [];
    this.currentFlashCardIndex = 0;
    this.guessCount = 0;
  }

  start(deck = DEFAULT_TABLE) {
    this.flashCardsDataService.getCards(deck, (result) => {
      this.flashCards = result;
      this.showFlashCard();
    });
  }

  showFlashCard() {
    this.flashCardsView.showFlashCard(this.flashCards[this.currentFlashCardIndex]);
  }

  onAnswer(flashCard) {
    const isCorrect = flashCard.isCorrect();
    if (isCorrect) {
      this.showNexFlashCard();
    } else {
      this.guessCount += 1;
      if (this.guessCount >= GUESS_LIMIT) {
        this.guessCount = 0;
        this.showNexFlashCard();
      } else {
        this.showFlashCard();
      }
    }
  }

  showNexFlashCard() {
    do {
      this.currentFlashCardIndex += 1;
    } while (
      this.currentFlashCardIndex < this.flashCards.length &&
      this.flashCards[this.currentFlashCardIndex].isCorrect()
    );

    if (this.currentFlashCardIndex >= this.flashCards.length) {
      this.flashCardsView.showStatistic(this.flashCards);
    } else {
      this.showFlashCard();
    }
  }

  replayDifficultCards() {
    this.currentFlashCardIndex = -1;
    this.guessCount = 0;
    this.showNexFlashCard();
  }

}

module.exports = FlashCardsController;
