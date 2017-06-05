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

  showStatistic(flashCards) {
    const correctFlashCards = flashCards.filter(flashCard => flashCard.isCorrect());
    const difficultCardsCount = flashCards.length - correctFlashCards.length;
    console.log(`
      You answered: ${correctFlashCards.length}
      Difficult cards : ${difficultCardsCount}
      `);

    if (difficultCardsCount > 0) {
      rl.question(`
        1. Replay Difficult Cards
        2. Exit
        `, (answer) => {
        if (answer === '1') {
          this._controller.replayDifficultCards();
        } else {
          rl.close();
        }
      });
    } else {
      rl.close();
    }
  }

}

module.exports = FlashCardsView;
