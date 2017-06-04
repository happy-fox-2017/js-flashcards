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
    rl.question(flashCard.definition + '\n', (answer) => {
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

}

module.exports = FlashCardsView;
