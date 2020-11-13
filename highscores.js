var userList = document.getElementById("Userlists");
var clearScoreBtn = document.getElementById("clearScores");

function createScores() {
    var storedHighScores = JSON.parse(localStorage.getItem("highscores"));
    storedHighScores.sort(function (a, b) { return b.score - a.score });

    storedHighScores.forEach(element => {
        var initials = element.name;
        var score = element.score;
        var li = document.createElement("li");
        li.innerHTML = `${score} : ${initials}`;
        userList.appendChild(li)
    });
}

function deleteAll() {
    localStorage.removeItem("highscores");
    location.reload()
}


createScores();

clearScoreBtn.addEventListener("click", deleteAll);