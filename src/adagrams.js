const Adagrams = {
  drawLetters() {
    let letterPool = [
      'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
      'B', 'B',
      'C', 'C',
      'D', 'D', 'D', 'D',
      'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
      'F', 'F',
      'G', 'G', 'G',
      'H', 'H',
      'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I',
      'J',
      'K',
      'L', 'L', 'L', 'L',
      'M', 'M',
      'N', 'N', 'N', 'N', 'N', 'N',
      'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
      'P', 'P',
      'Q',
      'R', 'R', 'R', 'R', 'R', 'R',
      'S', 'S', 'S', 'S',
      'T', 'T', 'T', 'T', 'T', 'T',
      'U', 'U', 'U', 'U',
      'V', 'V',
      'W', 'W',
      'X',
      'Y', 'Y',
      'Z'
    ];

    let hand = [];

    const getRandomTile = function getRandomTile(letterPool) {
      return Math.floor(Math.random() * Math.floor(letterPool.length));
    }

    for( let i = 0; hand.length < 10; i++ ) {
      let tile = getRandomTile(letterPool);
      let pull = letterPool[tile];
      if (pull !== null) {
        letterPool[tile] = null;
        hand.push(pull);
      }
    }

    return hand;
  },

  usesAvailableLetters(input, lettersInHand) {
    let newLettersInHand = lettersInHand.map(letter => letter);
    const word = input.toUpperCase().split('');
    let found = true;

    word.forEach( (letter) => {
      let foundAt = newLettersInHand.findIndex(tile => tile == letter);

      if (foundAt == -1) {
        found = false;
      } else {
        newLettersInHand[foundAt] = null;
      }
    });

    return found;
  },

  scoreWord(word) {
    let score = 0;

    word.toUpperCase().split('').forEach( (letter) => {
      if ("AEIOULNRST".includes(letter)) {
        score++;
      } else if ("DG".includes(letter)) {
        score += 2;
      } else if ("BCMP".includes(letter)) {
        score += 3;
      } else if ("FHVWY".includes(letter)) {
        score += 4;
      } else if ("K".includes(letter)) {
        score += 5;
      } else if ("JX".includes(letter)) {
        score += 8;
      } else if ("QZ".includes(letter)) {
        score += 10;
      }
    });

    if (word.length >= 7) {
      score += 8;
    }

    return score
  },

  highestScoreFrom(words) {
    let highest = {
      word: '',
      score: 0
    }

    words.forEach( (word) => {
      const currentScore = this.scoreWord(word);
      if (currentScore > highest.score) {
        highest.score = currentScore;
        highest.word = word;
      } else if (currentScore == highest.score) {
        if ((word.length == 10 && highest.word.length != 10) ||
        (word.length < highest.word.length && highest.word.length != 10)) {
          highest.score = currentScore;
          highest.word = word;
        }
      }
    });

    return highest;
  }

};

// Do not remove this line or your tests will break!
export default Adagrams;
