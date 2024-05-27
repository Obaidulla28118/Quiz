const questions = [
  {
    "question": "Which organelle is known as the powerhouse of the cell?",
    "options": {
      "A": "Ribosome",
      "B": "Chloroplast",
      "C": "Nucleus",
      "D": "Mitochondria"
    },
    "correct_answer": "D",
    "explanation": "Mitochondria are known as the powerhouse of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), which is used as a source of chemical energy."
  },
  {
    "question": "Which of the following is not a function of the human skeleton?",
    "options": {
      "A": "Support",
      "B": "Protection of vital organs",
      "C": "Transportation of nutrients",
      "D": "Production of blood cells"
    },
    "correct_answer": "C",
    "explanation": "The human skeleton provides support, protects vital organs, and produces blood cells, but it does not directly participate in the transportation of nutrients."
  },
  {
    "question": "What is the primary function of the circulatory system?",
    "options": {
      "A": "Respiration",
      "B": "Digestion",
      "C": "Transportation",
      "D": "Excretion"
    },
    "correct_answer": "C",
    "explanation": "The primary function of the circulatory system is transportation, which includes transporting oxygen, nutrients, hormones, and waste products throughout the body."
  },
  {
    "question": "Which of the following is responsible for the sense of smell in humans?",
    "options": {
      "A": "Cochlea",
      "B": "Retina",
      "C": "Olfactory epithelium",
      "D": "Tongue"
    },
    "correct_answer": "C",
    "explanation": "The olfactory epithelium, located in the nasal cavity, contains specialized receptors responsible for detecting odors and transmitting signals to the brain, allowing humans to perceive smell."
  },
  {
    "question": "What is the main function of the nephrons in the kidneys?",
    "options": {
      "A": "Regulation of body temperature",
      "B": "Filtration of blood",
      "C": "Production of bile",
      "D": "Digestion of proteins"
    },
    "correct_answer": "B",
    "explanation": "Nephrons are the functional units of the kidneys responsible for filtering blood, removing waste products, and regulating the balance of electrolytes and fluids in the body."
  }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const previousButton = document.getElementById("previous-btn");
const explainButton = document.getElementById("explain-btn");
const popupContainer = document.getElementById("popup-container");
const explanationText = document.getElementById("explanation-text");
const closeButton = document.querySelector(".close");
const timerDisplay = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  timeLeft = 15;
  startTimer();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
  Object.keys(currentQuestion.options).forEach(optionKey => {
    const button = document.createElement("button");
    button.innerHTML = currentQuestion.options[optionKey];
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (optionKey === currentQuestion.correct_answer) {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
  });
}

function startTimer() {
  timer = setInterval(function() {
    timeLeft--;
    timerDisplay.innerHTML = `⏰${timeLeft} s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      clickCorrectAnswer();
    }
  }, 1000);
}

function clickCorrectAnswer() {
  const correctBtn = document.querySelector('button[data-correct="true"]');
  if (correctBtn) {
    correctBtn.click();
  }
}

function resetState() {
  clearInterval(timer);
  timerDisplay.innerHTML = "";
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  clearInterval(timer);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  const accuracy = (score / questions.length) * 100;
  const formattedAccuracy = accuracy.toFixed(2);
  questionElement.innerHTML = `Your score = ${score} out of ${questions.length} (Accuracy = ${formattedAccuracy}% )`;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block";
  explainButton.style.display = "none";
  previousButton.style.display = "none";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

previousButton.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
});

explainButton.addEventListener("click", () => {
  const currentQuestion = questions[currentQuestionIndex];
  const explanation = currentQuestion.explanation;
  explanationText.textContent = explanation;
  popupContainer.style.display = "block";
});

closeButton.addEventListener("click", () => {
  popupContainer.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === popupContainer) {
    popupContainer.style.display = "none";
  }
});

startQuiz();
