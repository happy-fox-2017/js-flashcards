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
    this.difficultFlashCards = [];
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
    const isCorrect = flashCard.checkAnswer();
    if (isCorrect) {
      this.showNexFlashCard();
    } else {
      this.guessCount += 1;
      if (this.guessCount >= GUESS_LIMIT) {
        this.guessCount = 0;
        this.showNexFlashCard();
        this.difficultFlashCards.push(flashCard);
      } else {
        this.showFlashCard();
      }
    }
  }

  showNexFlashCard() {
    this.currentFlashCardIndex += 1;
    if (this.currentFlashCardIndex >= this.flashCards.length) {
      this.flashCardsView.showStatistic(this.flashCards, this.difficultFlashCards);
    } else {
      this.showFlashCard();
    }
  }

}

module.exports = FlashCardsController;
