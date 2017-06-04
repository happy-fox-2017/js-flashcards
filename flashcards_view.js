const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class FlashCardsView {

  constructor(controller) {
    this._controller = controller;
  }

  showFlashCard(flashCard) {
    rl.question(`\nDefinition\n${flashCard.definition}\n\nGuess: `, (answer) => {
      flashCard.answer = answer;
      this._controller.onAnswer(flashCard);
    });
  }

  static showMessage(message) {
    console.log(message);
  }

  static showError(message) {
    console.log('\x1b[31m', message);
  }

  showStatistic(flashCards, difficultFlashCards) {
    const correctFlashCards = flashCards.filter(flashCard => flashCard.checkAnswer);
    console.log(`
      You answered: ${correctFlashCards.length}
      Difficult cards : ${difficultFlashCards.length}
      `);
  }

}

module.exports = FlashCardsView;
