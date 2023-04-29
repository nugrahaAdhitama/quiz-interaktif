const scoreHistoryContainer = document.getElementById("scoreHistory")
const scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || [];

if (scoreHistory.length > 0) {
    scoreHistory.forEach((entry, index) => {
        const scoreEntry = document.createElement("p");
        scoreEntry.textContent = `Kuis ${index + 1} (${entry.date}): ${entry.score}`;
        scoreHistoryContainer.appendChild(scoreEntry);
    });
} else {
    scoreHistoryContainer.innerHTML = "<p>Anda belum pernah mengerjakan kuis</p>";
}

document.getElementById("goBack").addEventListener("click", function() {
    location.href = "index.html";
});