const scoreHistoryContainer = document.getElementById("scoreHistory")
const scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || [];

if (scoreHistory.length > 0) {
    scoreHistory.forEach((entry, index) => {
        const row = scoreHistoryContainer.insertRow();
        const dateCell = row.insertCell();
        dateCell.textContent = entry.date;

        const quizCell = row.insertCell();
        quizCell.textContent = `Kuis ${index + 1}`;

        const scoreCell = row.insertCell();
        scoreCell.textContent = `${entry.score}`;
    })
} else {
    const row = scoreHistoryContainer.insertRow();
    const cell = row.insertCell();
    cell.textContent = "Anda belum pernah mengerjakan kuis";
    cell.colSpan = 3;
    cell.style.textAlign = "center";
}

document.getElementById("goBack").addEventListener("click", function() {
    location.href = "index.html";
})