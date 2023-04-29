document.getElementById("viewScores").addEventListener("click", function() {
    let previousScores = localStorage.getItem("previousScores");

    if (!previousScores) {
        document.getElementById("noScoresMessage").style.display = "block";
    } else {
        // Tampilkan skor sebelumnya (akan diimplementasikan nanti)
    }
});

document.getElementById("startQuiz").addEventListener("click", function() {
    location.href = "quiz.html";
});

document.getElementById("viewScores").addEventListener("click", function() {
    location.href = "scores.html";
});