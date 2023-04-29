let questions = [];
let currentQuestion = 0;

document.querySelector(".choices").addEventListener("click", (event) => {
  if (event.target.classList.contains("choice-card")) {
    const selectedCard = event.target;
    const allCards = document.querySelectorAll(".choice-card");
    allCards.forEach((card) => {
      if (card === selectedCard) {
        card.classList.toggle("selected");
      } else {
        card.classList.remove("selected");
      }
    });
  }
});


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
    li.classList.add("choice-card");
    li.textContent = choice;
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