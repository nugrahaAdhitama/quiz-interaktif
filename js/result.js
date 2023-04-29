document.getElementById("score").innerText = localStorage.getItem("latestScore");

document.getElementById("backToHome").addEventListener("click", function() {
    location.href = "index.html";
});