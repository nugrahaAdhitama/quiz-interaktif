async function loadQuestions() {
  const response = await fetch("data/question.json");
  const questions = await response.json();
  return questions;
}

document.addEventListener("DOMContentLoaded", async function () {
  const questions = await loadQuestions();

  let currentQuestionIndex = 0;

  function showQuestion() {
    const questionElement = document.getElementById("question");
    questionElement.innerText = questions[currentQuestionIndex].question;

    const choicesElement = document.getElementById("choices");
    choicesElement.innerHTML = "";

    for (let i = 0; i < questions[currentQuestionIndex].choices.length; i++) {
      const choice = document.createElement("label");
      choice.classList.add("choice");

      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "choice";
      radioInput.value = i;

      choice.appendChild(radioInput);
      choice.appendChild(
        document.createTextNode(questions[currentQuestionIndex].choices[i])
      );
      choicesElement.appendChild(choice);
    }

    updateButtons();
  }

  let userAnswers = [];

  function getUserAnswer() {
    const radioInputs = document.getElementsByName("choice");
    for (const radioInput of radioInputs) {
      if (radioInput.checked) {
        return questions[currentQuestionIndex].choices[parseInt(radioInput.value)];
      }
    }
    return null;
  }  

  function nextQuestion() {
    const userAnswer = getUserAnswer();
    if (userAnswer === null) {
      alert("Silakan pilih satu jawaban.");
      return;
    }
    userAnswers[currentQuestionIndex] = userAnswer; // <-- Menyimpan jawaban pengguna
  
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    } else {
      const score = calculateScore(userAnswers);
      const currentDate = new Date();
      const scoreEntry = {
        date: currentDate.toISOString().slice(0, 10),
        score: score,
      };
  
      let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || [];
      scoreHistory.push(scoreEntry);
      localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));
  
      localStorage.setItem("latestScore", score);
  
      location.href = "result.html";
    }
  }
  
  function calculateScore(userAnswers) {
    let correctAnswers = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].answer) { // <-- Mengganti correctAnswer menjadi answer
        correctAnswers++;
      }
    }
    const scorePercentage = (correctAnswers / questions.length) * 100;
    return Math.round(scorePercentage);
  }
  

  function prevQuestion() {
    const userAnswer = getUserAnswer();
    userAnswers[currentQuestionIndex] = userAnswer;

    currentQuestionIndex--;
    showQuestion();
  }

  document.getElementById("prevQuestion").addEventListener("click", prevQuestion);
  function updateButtons() {
    const prevQuestionButton = document.getElementById("prevQuestion");
    const nextQuestionButton = document.getElementById("nextQuestion");

    if (currentQuestionIndex === 0) {
      prevQuestionButton.style.display = "none";
    } else {
      prevQuestionButton.style.display = "inline-block";
    }

    if (currentQuestionIndex === questions.length - 1) {
      nextQuestionButton.innerText = "Selesai";
    } else {
      nextQuestionButton.innerText = "Pertanyaan Selanjutnya";
    }
  }

  document
    .getElementById("nextQuestion")
    .addEventListener("click", nextQuestion);

  showQuestion();
});
