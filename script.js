const questions = [
  {
    question: "Which organelle is known as the powerhouse of the cell ?",
    options: {
      A: "Ribosome",
      B: "Chloroplast",
      C: "Nucleus",
      D: "Mitochondria",
    },
    correct_answer: "D",
    explanation: "NCERT Says »» Mitochondria generate most of the cell's ATP, making them the powerhouse of the cell.",
  },
  {
    question: "Which of the following is not a function of the human skeleton?",
    options: {
      A: "Support",
      B: "Protection of vital organs",
      C: "Transportation of nutrients",
      D: "Production of blood cells",
    },
    correct_answer: "C",
    explanation: "NCERT Says »» The human skeleton doesn't directly participate in nutrient transportation.",
  },
  {
    question: "What is the primary function of the circulatory system?",
    options: {
      A: "Respiration",
      B: "Digestion",
      C: "Transportation",
      D: "Excretion",
    },
    correct_answer: "C",
    explanation: "NCERT Says »» The circulatory system primarily transports oxygen, nutrients, hormones, and waste products.",
  },
  {
    question: "Which of the following is responsible for the sense of smell in humans?",
    options: {
      A: "Cochlea",
      B: "Retina",
      C: "Olfactory epithelium",
      D: "Tongue",
    },
    correct_answer: "C",
    explanation: "NCERT Says »» The olfactory epithelium contains receptors for detecting odors and transmitting signals to the brain.",
  },
  {
    question: "What is the main function of the nephrons in the kidneys?",
    options: {
      A: "Regulation of body temperature",
      B: "Filtration of blood",
      C: "Production of bile",
      D: "Digestion of proteins",
    },
    correct_answer: "B",
    explanation: "NCERT Says »» Nephrons filter blood, remove waste, and regulate electrolyte balance and fluid levels.",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;
let selectedAnswers = {};
let remainingTimes = Array(questions.length).fill(30);
let questionAnswered = Array(questions.length).fill(false);

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const previousButton = document.getElementById("previous-btn");
const explainButton = document.getElementById("explain-btn");
const popupContainer = document.getElementById("popup-container");
const explanationText = document.getElementById("explanation-text");
const closeButton = document.querySelector(".close");
const timerContainer = document.getElementById("timer-container");
const timerDisplay = document.getElementById("timer");
const progressBar = document.querySelector('.progress-bar');
const currentQuestionCount = document.querySelector('.progress');
const totalQuestions = questions.length;
const thankButton = document.querySelector(".thank-btn")
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  progressBar.style.display = "block";
  explainButton.style.display = "block";
  previousButton.style.display = "block";
  selectedAnswers = {};
  remainingTimes = Array(questions.length).fill(30);
  questionAnswered = Array(questions.length).fill(false);
  showQuestion();
  updateProgress();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
  Object.keys(currentQuestion.options).forEach(optionKey => {
    const button = document.createElement("button");
    button.innerHTML = currentQuestion.options[optionKey];
    button.classList.add("btn");
    button.dataset.option = optionKey;
    if (optionKey === currentQuestion.correct_answer) {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
  if (selectedAnswers[currentQuestionIndex] !== undefined) {
    highlightSelectedAnswer(selectedAnswers[currentQuestionIndex]);
  }
  timeLeft = remainingTimes[currentQuestionIndex];
  if (!questionAnswered[currentQuestionIndex]) {
    startTimer();
  } else {
    updateTimerDisplay();
  }
  updateProgress();
}

function startTimer() {
  updateTimerDisplay();
  timer = setInterval(function() {
    timeLeft--;
    if (timeLeft <= 0) {
      timeLeft = 0; // Ensure the timer does not go below zero
      clearInterval(timer);
      clickCorrectAnswer(); // Show the correct answer but do not increase the score
    }
    remainingTimes[currentQuestionIndex] = timeLeft;
    updateTimerDisplay();
  }, 1000);
}


function updateTimerDisplay() {
  timerDisplay.innerHTML = `⏰ ${timeLeft} s Left`;
  timerDisplay.style.width = `${timeLeft * 100 / 30}%`;
}

function stopTimer() {
  clearInterval(timer);
}

function navigateToPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
    nextButton.style.display='block'
    explainButton.style.display='block'
    thankButton.style.display='none'
    previousButton.innerHTML='Previous'
    previousButton.style.border='0.5px solid darkgreen'
    
  }
}

function onAnswerClicked() {
  if (remainingTimes[currentQuestionIndex] < 30) {
    questionAnswered[currentQuestionIndex] = true;
    stopTimer();
  }
}

function clickCorrectAnswer() {
  const correctBtn = document.querySelector('button[data-correct="true"]');
  if (correctBtn) {
    correctBtn.classList.add("correct");
    Array.from(answerButtons.children).forEach(button => {
      button.disabled = true;
    });
    nextButton.style.display = "block";
    questionAnswered[currentQuestionIndex] = true;
    updateProgress();
  }
}


function resetState() {
  clearInterval(timer);
  timerDisplay.innerHTML = "";
  timerDisplay.style.width = "100%";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  stopTimer(); // Stop the timer immediately
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  selectedAnswers[currentQuestionIndex] = selectedBtn.dataset.option;
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    showCorrectAnswer();
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
  questionAnswered[currentQuestionIndex] = true;
  updateProgress();
}

function highlightSelectedAnswer(selectedOption) {
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.option === selectedOption) {
      button.classList.add("selected");
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      } else {
        button.classList.add("incorrect");
        showCorrectAnswer();
      }
    }
    button.disabled = true;
  });
}

function showCorrectAnswer() {
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
}

function showScore() {
  resetState();
  const accuracy = (score / questions.length) * 100;
  const formattedAccuracy = accuracy.toFixed(2);
  questionElement.innerHTML = `Total ✅ = ${score} out of ${questions.length} Accuracy = ${formattedAccuracy}% !`;
  nextButton.style.display='none'
  explainButton.style.display='none'
  thankButton.style.display='block'
  previousButton.innerHTML='Review'
  previousButton.style.backgroundColor=' #e7f6d5'
  previousButton.style.border='1px solid red'
  previousButton.style.color='darkgreen'
  
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } 
  else {
    showScore();
    
  }
}

nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  }
  else {
    startQuiz()
  }
  
});

previousButton.addEventListener("click", navigateToPreviousQuestion);

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

function updateProgress() {
  currentQuestionCount.textContent = `${currentQuestionIndex + 1} of ${questions.length} Questions`;
}

startQuiz();

