let questions = [];
let currentQuestion = 0;

function loadQuestions() {
  fetch("data/question.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      displayQuestion();
    });
}

function displayQuestion() {
  const question = questions[currentQuestion];
  const choices = question.choices;
  const questionElement = document.querySelector(".question");
  const choicesList = document.querySelector(".choices");

  questionElement.textContent = question.question;
  choicesList.innerHTML = "";

  for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.classList.add("choice");
    button.textContent = choice;
    li.appendChild(button);
    choicesList.appendChild(li);
  }

  updateNavigationButtons();
}

function updateNavigationButtons() {
  const prevButton = document.querySelector(".prev-question");
  const nextButton = document.querySelector(".next-question");

  prevButton.disabled = currentQuestion === 0;
  nextButton.textContent =
    currentQuestion === questions.length - 1 ? "Selesai" : "Selanjutnya";
}

document.querySelector(".prev-question").addEventListener("click", () => {
  currentQuestion--;
  displayQuestion();
});

document.querySelector(".next-question").addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion === questions.length) {
    // Tampilkan hasil
  } else {
    displayQuestion();
  }
});

loadQuestions();