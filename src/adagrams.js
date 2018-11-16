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

    const points = {
      'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
      'D': 2, 'G': 2, 'B': 3, 'C': 3, 'M': 3, 'P': 3, 'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
      'K': 5, 'J': 8, 'X': 8, 'Q': 10, 'Z': 10
    }

    word.toUpperCase().split('').forEach( (letter) => score += points[letter] );

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
