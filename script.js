var intro = document.getElementById("introContent");
var questionList = document.getElementById("questionsLists");
var formResult = document.getElementById("formResult");
var startBtn = document.getElementById("startbutton");
var questions = document.getElementById("questions");
var answerList = document.getElementById("answerList");
var finalScore = document.getElementById("finalScore");
var submitBtn = document.getElementById("submitScore");
var timePoint = document.getElementById("timePoint")
var initials = document.getElementById("initials")
var currentQuestionIndex = 0;
var startingTime = 100;
var scoresArray = []
var storedHighScores = JSON.parse(localStorage.getItem("highscores"));

function inti() {
    intro.style.display = "block";
    questionList.style.display = "none";
    formResult.style.display = "none";
}
inti();




function showQuestions(questionIndex) {
    if (questionIndex < questionArray.length) {

        let ques = questionArray[currentQuestionIndex];
        questions.innerHTML = "<p>Question " + (questionIndex + 1) + ":" + ques.question + "</p>";

        answerList.innerHTML = ""
        for (var i = 0; i < ques.answers.length; i++) {
            var li = document.createElement("li");
            li.setAttribute("answerIndex", i);
            var button = document.createElement("btn");
            button.textContent = ques.answers[i];
            button.setAttribute("class", "btn btn-primary mt-2 mb-2");
            li.appendChild(button);

            answerList.appendChild(li);
        }
    } else {
        finishQuiz()
    }
}


function checkAnswer(event) {
    element = event.target;
    if (element.matches("btn") === true) {
        var answer = element.parentElement.getAttribute("answerIndex");
        if (answer == questionArray[currentQuestionIndex].answerdex) {
            alert("correct")
        } else {
            alert("wrong");
            startingTime -= 10;
        }
        currentQuestionIndex++;
        showQuestions(currentQuestionIndex);
    }
}

function finishQuiz() {
    questionList.style.display = "none"
    formResult.style.display = "block"
    clearInterval()
    finalScore.innerHTML = startingTime;

}


function startQuiz() {
    intro.style.display = "none";
    questionList.style.display = "block";
    var countdownTimer = setInterval(function () {
        startingTime--;
        timePoint.innerHTML = startingTime;
        if (startingTime <= 0 || currentQuestionIndex == questionArray.length) {
            clearInterval(countdownTimer);
            finishQuiz();
        }
    }, 1000);
    showQuestions(currentQuestionIndex);

}

function scoreSubmit(event) {
    if (initials.value == "") {
        alert("Please enter something into the text box")
        initials.focus();
        event.preventDefault()
    } else {
        var user = {
            name: initials.value,
            score: startingTime,
        }
        //check if the high score is empty or not
        if (storedHighScores != null) {
            scoresArray = storedHighScores;
        }
        scoresArray.push(user)
        localStorage.setItem("highscores", JSON.stringify(scoresArray));
        location.reload();
    }

}

var questionArray = [
    {
        question: "What is Link's Sword called ?",
        answers: ["master sword", "fairy Sword", "legend sword", "deku sword"],
        answerdex: 0

    },
    {
        question: "what is 5 + 10 ?",
        answers: ["5", "510", "15", "5+10"],
        answerdex: 2

    },
    {
        question: "What is mario's brothers name ?",
        answers: ["mario jr", "luigi", "wario", "toad"],
        answerdex: 1

    },
    {
        question: "Whose Donkey Kongs sidekick ?",
        answers: ["diddy kong", "tiny kong", "mario", "king k"],
        answerdex: 0

    },
    {
        question: "where is princess peach from ?",
        answers: ["toad kingdom", "koopa troopa beach", "Royal Highway Kingdom", "Moo Moo Farm"],
        answerdex: 0

    },

]


startBtn.addEventListener("click", startQuiz);
answerList.addEventListener("click", checkAnswer);
submitBtn.addEventListener("click", scoreSubmit);