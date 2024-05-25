const questions = [
  {
    "question": "What is the structure that carries genetic information within a cell?",
    "options": {
      "A": "Ribosome",
      "B": "Chromosome",
      "C": "Lysosome",
      "D": "Mitochondria"
    },
    "correct_answer": "B",
    "explanation": "Chromosomes are structures composed of DNA and proteins, carrying the genetic information of an organism."
  },
  {
    "question": "Which of the following nitrogenous bases is NOT found in DNA?",
    "options": {
      "A": "Adenine",
      "B": "Thymine",
      "C": "Uracil",
      "D": "Cytosine"
    },
    "correct_answer": "C",
    "explanation": "Uracil is found in RNA, while DNA contains adenine, thymine, guanine, and cytosine as its nitrogenous bases."
  },
  {
    "question": "Which enzyme is responsible for joining Okazaki fragments during DNA replication?",
    "options": {
      "A": "Helicase",
      "B": "Primase",
      "C": "DNA polymerase",
      "D": "Ligase"
    },
    "correct_answer": "D",
    "explanation": "Ligase is the enzyme responsible for sealing the nicks between the Okazaki fragments, completing the synthesis of the lagging strand during DNA replication."
  },
  {
    "question": "What is the process by which genetic information from DNA is converted into RNA?",
    "options": {
      "A": "Replication",
      "B": "Translation",
      "C": "Transcription",
      "D": "Transformation"
    },
    "correct_answer": "C",
    "explanation": "Transcription is the process by which RNA is synthesized from a DNA template, producing messenger RNA (mRNA), transfer RNA (tRNA), or ribosomal RNA (rRNA)."
  },
  {
    "question": "Which of the following is responsible for bringing the amino acids to the ribosome during protein synthesis?",
    "options": {
      "A": "tRNA",
      "B": "mRNA",
      "C": "rRNA",
      "D": "DNA polymerase"
    },
    "correct_answer": "A",
    "explanation": "Transfer RNA (tRNA) is responsible for carrying the amino acids to the ribosome, where they are incorporated into the growing polypeptide chain during protein synthesis."
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

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
  // Display options
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

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
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
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
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
