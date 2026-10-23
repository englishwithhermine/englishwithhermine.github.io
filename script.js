// ENGLISH WITH HERMINE 2.0
// Игры, тест и отзывы

const gameArea = document.getElementById("gameArea");
const gameStatus = document.getElementById("gameStatus");
const restartGame = document.getElementById("restartGame");

let currentGame = "match";
let gameIndex = 0;
let gameScore = 0;
let selectedWord = null;

// ---------- GAME 1: WORD MATCH ----------

const wordPairs = [
  ["Improve", "Улучшать"],
  ["Confident", "Уверенный"],
  ["Opportunity", "Возможность"],
  ["Experience", "Опыт"],
  ["Achieve", "Достигать"]
];

let matchedWords = [];

function startMatch() {
  matchedWords = [];
  selectedWord = null;
  gameStatus.textContent = "Найди пары: английское слово и его перевод.";

  const words = [];

  wordPairs.forEach((pair, index) => {
    words.push({ text: pair[0], id: index, lang: "en" });
    words.push({ text: pair[1], id: index, lang: "ru" });
  });

  // Перемешиваем карточки
  words.sort(() => Math.random() - 0.5);

  gameArea.innerHTML = `
    <h3>Word Match 🧩</h3>
    <p>Соедини английские слова с переводами.</p>
    <div class="game-options" id="wordCards"></div>
  `;

  const container = document.getElementById("wordCards");

  words.forEach(word => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = word.text;

    button.onclick = () => {
      if (button.disabled) return;

      if (!selectedWord) {
        selectedWord = { ...word, button };
        button.classList.add("selected");
        return;
      }

      if (selectedWord.button === button) {
        button.classList.remove("selected");
        selectedWord = null;
        return;
      }

      if (
        selectedWord.id === word.id &&
        selectedWord.lang !== word.lang
      ) {
        button.classList.add("correct");
        selectedWord.button.classList.remove("selected");
        selectedWord.button.classList.add("correct");

        button.disabled = true;
        selectedWord.button.disabled = true;

        matchedWords.push(word.id);
        gameStatus.textContent =
          `Правильно! Найдено ${matchedWords.length} из ${wordPairs.length} пар.`;

        if (matchedWords.length === wordPairs.length) {
          gameStatus.textContent =
            "🎉 Отлично! Ты нашёл все пары!";
        }
      } else {
        selectedWord.button.classList.remove("selected");
        gameStatus.textContent = "Попробуй другую пару 🙂";
      }

      selectedWord = null;
    };

    container.appendChild(button);
  });
}

// ---------- GAME 2: GRAMMAR CHALLENGE ----------

const grammarQuestions = [
  {
    question: "She ___ English every day.",
    answers: ["study", "studies", "studying", "studied"],
    correct: 1
  },
  {
    question: "I have ___ finished my homework.",
    answers: ["yet", "already", "tomorrow", "never"],
    correct: 1
  },
  {
    question: "If I had more time, I ___ travel more.",
    answers: ["will", "would", "am", "have"],
    correct: 1
  },
  {
    question: "We ___ to London last year.",
    answers: ["go", "gone", "went", "going"],
    correct: 2
  },
  {
    question: "This book is ___ than that one.",
    answers: ["interesting", "more interesting", "most interesting", "interest"],
    correct: 1
  }
];

function startGrammar() {
  gameIndex = 0;
  gameScore = 0;
  showGrammarQuestion();
}

function showGrammarQuestion() {
  if (gameIndex >= grammarQuestions.length) {
    gameArea.innerHTML = `
      <h3>Grammar Challenge completed! 🎉</h3>
      <p>Твой результат: ${gameScore} из ${grammarQuestions.length}</p>
    `;
    gameStatus.textContent = "Можешь сыграть ещё раз!";
    return;
  }

  const question = grammarQuestions[gameIndex];

  gameArea.innerHTML = `
    <h3>Grammar Challenge 🧠</h3>
    <p>Вопрос ${gameIndex + 1} из ${grammarQuestions.length}</p>
    <h3>${question.question}</h3>
    <div class="game-options" id="grammarOptions"></div>
  `;

  gameStatus.textContent = `Баллы: ${gameScore}`;

  const container = document.getElementById("grammarOptions");

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = answer;

    button.onclick = () => {
      const buttons = container.querySelectorAll("button");
      buttons.forEach(b => b.disabled = true);

      if (index === question.correct) {
        button.classList.add("correct");
        gameScore++;
        gameStatus.textContent = "Правильно! ✅";
      } else {
        button.classList.add("wrong");
        buttons[question.correct].classList.add("correct");
        gameStatus.textContent = "Правильный ответ выделен зелёным.";
      }

      const next = document.createElement("button");
      next.className = "button small";
      next.textContent = "Следующий вопрос →";
      next.onclick = () => {
        gameIndex++;
        showGrammarQuestion();
      };

      gameArea.appendChild(next);
    };

    container.appendChild(button);
  });
}

// ---------- GAME 3: BUILD A SENTENCE ----------

const sentences = [
  ["I", "want", "to", "improve", "my", "English"],
  ["She", "has", "been", "learning", "English"],
  ["We", "are", "going", "to", "travel"],
  ["Could", "you", "help", "me", "please"]
];

let sentenceWords = [];

function startSentence() {
  gameIndex = 0;
  gameScore = 0;
  showSentence();
}

function showSentence() {
  if (gameIndex >= sentences.length) {
    gameArea.innerHTML = `
      <h3>Well done! 🎉</h3>
      <p>Правильно составлено предложений: ${gameScore} из ${sentences.length}</p>
    `;
    gameStatus.textContent = "Отличная практика!";
    return;
  }

  sentenceWords = [];

  const correctSentence = sentences[gameIndex];

  gameArea.innerHTML = `
    <h3>Build a Sentence ✍️</h3>
    <p>Предложение ${gameIndex + 1} из ${sentences.length}</p>
    <p>Нажимай на слова в правильном порядке.</p>
    <div class="game-box" id="sentenceResult">
      Здесь появится твоё предложение...
    </div>
    <div class="game-options" id="sentenceOptions"></div>
    <button class="button outline small" id="clearSentence">
      Очистить ↻
    </button>
    <button class="button small" id="checkSentence">
      Проверить ✓
    </button>
  `;

  gameStatus.textContent = "";

  const shuffled = correctSentence
    .map((word, index) => ({ word, index }))
    .sort(() => Math.random() - 0.5);

  const options = document.getElementById("sentenceOptions");
  const result = document.getElementById("sentenceResult");

  function updateResult() {
    result.textContent = sentenceWords.length
      ? sentenceWords.map(item => item.word).join(" ")
      : "Здесь появится твоё предложение...";
  }

  shuffled.forEach(item => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = item.word;

    button.onclick = () => {
      sentenceWords.push(item);
      button.disabled = true;
      button.classList.add("selected");
      updateResult();
    };

    options.appendChild(button);
  });

  document.getElementById("clearSentence").onclick = () => {
    sentenceWords = [];
    options.querySelectorAll("button").forEach(button => {
      button.disabled = false;
      button.classList.remove("selected");
    });
    updateResult();
    gameStatus.textContent = "";
  };

  document.getElementById("checkSentence").onclick = () => {
    const correct = sentenceWords.length === correctSentence.length &&
      sentenceWords.every((item, index) => item.index === index);

    if (correct) {
      gameScore++;
      gameStatus.textContent = "Отлично! Правильное предложение! ✅";
    } else {
      gameStatus.textContent =
        "Правильный вариант: " + correctSentence.join(" ");
    }

    options.querySelectorAll("button").forEach(b => b.disabled = true);
    document.getElementById("checkSentence").disabled = true;
    document.getElementById("clearSentence").disabled = true;

    const next = document.createElement("button");
    next.className = "button small";
    next.textContent = "Следующее предложение →";
    next.onclick = () => {
      gameIndex++;
      showSentence();
    };

    gameArea.appendChild(next);
  };
}

// ---------- SWITCH GAMES ----------

function startGame() {
  if (currentGame === "match") startMatch();
  if (currentGame === "grammar") startGrammar();
  if (currentGame === "sentence") startSentence();
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => {
      t.classList.remove("active");
    });

    tab.classList.add("active");
    currentGame = tab.dataset.game;
    startGame();
  };
});

restartGame.onclick = startGame;
startGame();

// ---------- ENGLISH LEVEL MINI TEST ----------

const testQuestions = [
  {
    question: "I ___ from Armenia.",
    answers: ["am", "is", "are", "be"],
    correct: 0
  },
  {
    question: "She ___ coffee every morning.",
    answers: ["drink", "drinks", "drinking", "drank"],
    correct: 1
  },
  {
    question: "They ___ a movie yesterday.",
    answers: ["watch", "watched", "watching", "watches"],
    correct: 1
  },
  {
    question: "I have lived here ___ 2020.",
    answers: ["for", "since", "during", "from"],
    correct: 1
  },
  {
    question: "If it rains, we ___ at home.",
    answers: ["stay", "stayed", "will stay", "staying"],
    correct: 2
  },
  {
    question: "By the time I arrived, they ___ dinner.",
    answers: [
      "finish",
      "have finished",
      "had finished",
      "finishing"
    ],
    correct: 2
  }
];

let testIndex = 0;
let testScore = 0;

const testArea = document.getElementById("testArea");
const restartTest = document.getElementById("restartTest");

function showTest() {
  if (testIndex >= testQuestions.length) {
    let message = "";

    if (testScore <= 2) {
      message = "Хорошее начало! Есть над чем поработать.";
    } else if (testScore <= 4) {
      message = "Неплохо! Ты уже знаешь многие конструкции.";
    } else {
      message = "Отличный результат! Продолжай практиковаться.";
    }

    testArea.innerHTML = `
      <h3>Тест завершён! 🎉</h3>
      <h2>${testScore} / ${testQuestions.length}</h2>
      <p>${message}</p>
      <p>Для точной оценки уровня нужен более подробный тест.</p>
    `;

    restartTest.hidden = false;
    return;
  }

  const question = testQuestions[testIndex];

  testArea.innerHTML = `
    <p class="eyebrow">QUESTION ${testIndex + 1} / ${testQuestions.length}</p>
    <h3>${question.question}</h3>
    <div class="game-options" id="testOptions"></div>
  `;

  const container = document.getElementById("testOptions");

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = answer;

    button.onclick = () => {
      if (index === question.correct) {
        testScore++;
      }

      testIndex++;
      showTest();
    };

    container.appendChild(button);
  });
}

restartTest.onclick = () => {
  testIndex = 0;
  testScore = 0;
  restartTest.hidden = true;
  showTest();
};

showTest();

// ---------- REAL STUDENT REVIEWS ----------
// Короткие выдержки из присланных отзывов.

const reviews = [
  {
    name: "Асмик",
    date: "1 октября 2026",
    text: "С первого пробного урока я поняла, что Эрмине — точно мой преподаватель!"
  },
  {
    name: "Елена",
    date: "15 сентября 2026",
    text: "Очень понравился преподаватель."
  },
  {
    name: "Елена",
    date: "8 августа 2026",
    text: "Уже за 7 занятий я заметила хороший прогресс."
  },
  {
    name: "Дарья",
    date: "8 июля 2026",
    text: "Эрмине очень хороший специалист. Помогла мне четко по моей задаче!"
  },
  {
    name: "Екатерина",
    date: "20 июня 2026",
    text: "Мы занимаемся две недели и уже есть результат."
  },
  {
    name: "Алена",
    date: "15 июня 2026",
    text: "Благодаря такому подходу исчезает страх ошибок и появляется уверенность в общении."
  },
  {
    name: "Анастасия",
    date: "19 февраля 2026",
    text: "С самого первого дня все уроки проходят на английском языке."
  },
  {
    name: "Александр",
    date: "16 февраля 2026",
    text: "За короткое время уже виден прогресс как в словарном запасе, так и в грамматике."
  },
  {
    name: "Евгения",
    date: "13 февраля 2026",
    text: "Занятие прошло на одном дыхании, очень интересно и весело."
  },
  {
    name: "Екатерина",
    date: "15 января 2026",
    text: "Занятия проходят в живом, интерактивном формате."
  },
  {
    name: "Анна",
    date: "14 января 2026",
    text: "Ведет весь урок исключительно на Английском языке."
  },
  {
    name: "Вера",
    date: "24 сентября 2025",
    text: "С первого занятия мы общаемся на английском и переписываемся тоже."
  },
  {
    name: "Алина",
    date: "27 августа 2025",
    text: "Спустя пару занятий мы обе отметили мой прогресс."
  },
  {
    name: "Татьяна",
    date: "5 июня 2025",
    text: "С Эрмине быстро и легко проходят занятия."
  },
  {
    name: "Валерий",
    date: "15 октября 2024",
    text: "На глазах растёт уровень моей разговорной речи, пропадает языковой барьер."
  }
];

const reviewGrid = document.getElementById("reviewGrid");
const moreReviews = document.getElementById("moreReviews");

let visibleReviews = 6;

function renderReviews() {
  reviewGrid.innerHTML = "";

  reviews.slice(0, visibleReviews).forEach(review => {
    const card = document.createElement("article");
    card.className = "review";

    const stars = document.createElement("div");
    stars.className = "stars";
    stars.textContent = "✦ ✦ ✦";

    const text = document.createElement("p");
    text.textContent = "«" + review.text + "»";

    const name = document.createElement("strong");
    name.textContent = review.name;

    const date = document.createElement("small");
    date.textContent = review.date;

    card.append(stars, text, name, document.createElement("br"), date);
    reviewGrid.appendChild(card);
  });

  moreReviews.hidden = visibleReviews >= reviews.length;
}

moreReviews.onclick = () => {
  visibleReviews += 6;
  renderReviews();
};

renderReviews();

// ---------- CONTACT DEMO ----------

document.getElementById("contactBtn").onclick = () => {
  document.getElementById("contactNotice").textContent =
    "Скоро здесь появится настоящая запись на занятия. " +
    "Сначала согласуем контактные данные с Hermine.";
};