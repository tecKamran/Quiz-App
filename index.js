const questions = [
  {
    question: "My Name is?",
    answers: [
      { text: "Kamran", correct: true },
      { text: "Imran", correct: false },
      { text: "Naeem", correct: false },
      { text: "Akbar", correct: false },
    ],
  },
  {
    question: "I am a ?",
    answers: [
      { text: "Businessman", correct: false },
      { text: "Farmer", correct: false },
      { text: "Web Developer", correct: true },
      { text: "Cricketer", correct: false },
    ],
  },
  {
    question: "I have done?",
    answers: [
      { text: "CS", correct: true },
      { text: "BBA", correct: false },
      { text: "Fine Arts", correct: false },
      { text: "Engineering", correct: false },
    ],
  },
  {
    question: "My country is?",
    answers: [
      { text: "Pakistan", correct: true },
      { text: "England", correct: false },
      { text: "India", correct: false },
      { text: "Peiru", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const timerDisplay = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  localStorage.removeItem("lastScore");
  showQuestion();
}

function showQuestion() {
  resetState();
  updateProgressBar();
  startTimer();

  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  clearInterval(timer);
  timeLeft = 10;
  timerDisplay.innerText = `Time Left: ${timeLeft}s`;
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

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
  localStorage.setItem("lastScore", score);
  progressBar.style.width = `100%`;
  nextButton.innerHTML = "Try Again";
  nextButton.style.display = "block";
  timerDisplay.innerText = "";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function updateProgressBar() {
  const progress = (currentQuestionIndex / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function startTimer() {
  timerDisplay.innerText = `Time Left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time Left: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      autoSelect();
    }
  }, 1000);
}

function autoSelect() {
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
