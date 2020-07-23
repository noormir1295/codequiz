var currentQuestion=0;
var currentScore;
var startQuiz
var currentTime=45;
var questionContainer = document.getElementById("question-container");
var interval;

startBtn.addEventListener("click", function(event){
    event.stopPropagation();
    document.getElementById("start-button").style.display="none";
    clear = setInterval(updateCountdown, 1000),
    showCurrentQuestion();
})



questionContainer.addEventListener("click",function(event) {
   
    if(event.target.matches("li")) {
        var answer = event.target.innerText;

        var question = questions[currentQuestion];

        if (answer===question.answer) {
            currentScore++
        } else {
             currentTime-= 5;
        }
        if(currentQuestion >= questions.length) {
            finishQuiz();
        } else {
            showCurrentQuestion();
        }
    }
});



function showHighScore() {
var highestScore=localStorage.getItem("highScore");
var userName=localStorage.getItem("userName");

if (highestScore && userName) {
    alert()
}
}




var questions = [
    {
        question: "What code are you using?",
        options:["Javascript", "youtube" , "Python"],
        answer: "Javascript"

    },
    {
        question: "How long is this course",
        options:["14 weeks","40 weeks", "24 weeks"],
        answer: "24 weeks" 
    },
    {
        question: "What developer mainly works on html, css, and javascript",
        options: ["Front End Developer", "Back End Developer", "Mechanical Engineer"],
        answer: "Front End Developer"
    },
    {
        question: "What is Visual Studio Code?",
        options: ["A text editor", "A server", "A repository"],
        answer: "A text editor"
    }
]


function showCurrentQuestion() {
    var question = questions[currentQuestion];
    questionContainer.innerHTML = "";

    var questionTitle = document.createElement("h1")
    questionTitle.innerText = question.question;
    questionContainer.appendChild(questionTitle);

    var optionList = document.createElement("ul");
    
    for(var i=0; i<question.options.length; i++) {
        var questionLi = document.createElement("li");
       questionLi.innerText=question.options[i]
         optionList.appendChild(questionLi);


    }
    questionContainer.appendChild(optionList);

}


function startQuiz () {
    showCurrentQuestion();
   
    var timerInterval = setInterval(decrementTimeNumber, 1000);

    function decrementTimeNumber() {
        currentTime--;
        if (currentTime == 0) {
            stopTimer();
            finishQuiz();
        }

    }
}
function stopTimer() {
    clearInterval(timerInterval);
}

function finishQuiz() {
    clearInterval(interval);
   var highestScore=localStorage.get("highScore");
   if (currentScore > highestScore) {
       var userName=prompt("what is your name?")
       localStorage.setItem("highScore", currentScore);
       localStorage.setItem("username", userName)
   }

startQuiz();