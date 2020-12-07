var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var finishButton = document.getElementById('finish-btn')
//Var for selecting multiple elements on the page to minipulate 
var mainCardElement = document.getElementById('main-card')
var questionCardElement = document.getElementById('question-card')
var timerElement = document.getElementById('timer')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var pointElement = document.getElementById('score-count')

// variable to keep track of the user's score 
var scoreCount = 0

var getRandomQuestion, questionIndex

//event listener for when the start game button is pressed 
startButton.addEventListener('click', startGame)

//eventlistener for the next button after a question is awnsered to proceded to the next question, will stop if there are no more quesitons in the array to get 
nextButton.addEventListener('click', () => {
    questionIndex++
    nextQuestion()
})

finishButton.addEventListener('click', endGame)

//function to start the game when the start button is pressed
function startGame() {
    mainCardElement.classList.add('hide')
    getRandomQuestion = questions.sort(() => Math.random() - .5)
    questionIndex = 0
    questionCardElement.classList.remove('hide')
    timerElement.classList.remove('hide')
    pointElement.classList.remove('hide')
    nextQuestion()
    timer()
}


//function that will get the next question 
function nextQuestion() {
    resetState()
    showQuestion(getRandomQuestion[questionIndex])
}
//function removes the previous awnser buttons (to prevent a user from slecting an awnser from a previous question) and removes the next question button to force the user to select and awnser
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
//function called when the game is started to get the questions and awnsers to show 
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answers => {
        var button = document.createElement('button')
        button.innerText = answers.text
        button.classList.add('btn')
        if (answers.correct) {
            button.dataset.correct = answers.correct

        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
//function for when the user selecets an awnsers, will also bring up a finish button 
function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (getRandomQuestion.length > questionIndex + 1) {
        nextButton.classList.remove('hide')
        //adds a point if the selcted awnser was correct 
        if (event.target.dataset.correct === 'true') {
            
            scoreCount++
            document.getElementById('scoreDisplay').innerHTML = 'Points:  ' + scoreCount
        }
    } else {
        //adds a point if the selcted awnser was correct and it was the last awnser 
        if (event.target.dataset.correct === 'true') {
            scoreCount++
            pointElement.classList.add('hide')
            console.log(scoreCount)
            //stores the user's score in the local storage after the last question 
        }
        localStorage.setItem("score", scoreCount);

        finishButton.classList.remove('hide')
    }
}


//funtion to add green and red to the buttons indicating the correct awnsers AFTER the user inputs a choice
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}
//function removes the green and red which indicate the right awnser AFTER moving to the next question 
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
// function for the game timer that is called by pressing the start game button, if the timer reaches 0 it will alert the user that time us up and bring them to the score screen
function timer() {
    var sec = 119;  //intentially made the time 119 seconds becuase it takes about a seconds for the function to start after the start game button is pressed 
    var timer = setInterval(function () {
        document.getElementById('timerDisplay').innerHTML = '' + sec + '   seconds remaining'
        sec--
        if (sec < 0) {
            clearInterval(timer)
            alert('TIME IS UP')
            endGame()
        }
    }, 1000)
}


// function that will end the game and bring the user to the score screen. 
function endGame() {
    window.location.href = "scores.html"

}

var questions = [
    
   {
    question: 'What area do the New York Giants play in?',
    answers: [
        { text: 'Brooklyn', correct: false },
        { text: 'New Jersey', correct: true },
        { text: 'Queens', correct: false },
        { text: 'Bronx', correct: false },
    ]
},
{
    question: 'Which quarterback gave the giants two Superbowl championships in the last 20 years?',
    answers: [
        { text: 'Daniel Jones', correct: false },
        { text: 'Colt Mccoy', correct: false },
        { text: 'Eli Manning', correct: true },
        { text: 'Tom Brady', correct: false },
    ]
},
{
    question: 'What is Eli Manning’s jersey number?',
    answers: [
        { text: '10', correct: true },
        { text: '12', correct: false },
        { text: '32', correct: false },
        { text: '35', correct: false },
    ]
},
{
    question: 'How many times have the New York Giants won the Superbowl?',
    answers: [
        { text: '2', correct: false },
        { text: '4', correct: true },
        { text: '5', correct: false },
        { text: '9', correct: false },
    ]
},
{
    question: 'What college did current runningback star Saquon Barkley play for?',
    answers: [
        { text: 'Duke', correct: false },
        { text: 'Villanova', correct: false },
        { text: 'Clemson', correct: false },
        { text: 'Penn State', correct: true },
    ]
},
{
    question: 'Who is the current Coach for the Giants (2020-2021)?',
    answers: [
        { text: 'Joe Judge', correct: true },
        { text: 'Tom Coughlin', correct: false },
        { text: 'Pat Shurmur', correct: false },
        { text: 'Ben McAdoo', correct: false },
    ]
},
{
    question: 'How much did team founder Tim Mara purchase the New York Giants for? ',
    answers: [
        { text: '$10,000', correct: false },
        { text: '$3,000', correct: false },
        { text: '$500', correct: true },
        { text: '$5,000', correct: false },
    ]
},
{
    question: 'What was the record for the New York Giants in the 2019-2020 season?',
    answers: [
        { text: '16-0', correct: false },
        { text: '3-13', correct: true },
        { text: '7-9', correct: false },
        { text: '10-6', correct: false },
    ]
},
{
    question: 'What is the most amount of interceptions thrown by Eli Manning in a single season?',
    answers: [
        { text: '21', correct: false },
        { text: '13', correct: false },
        { text: '17', correct: false },
        { text: '27', correct: true },
    ]
},
{
    question: 'Which player was famous for having the “One-Hand Catch” against the Dallas Cowboys?',
    answers: [
        { text: 'Sterling Shepard', correct: false },
        { text: 'Plaxico Burress', correct: false },
        { text: 'Odell Beckham Jr.', correct: true },
        { text: 'Mario manningham', correct: false },
    ]
},


]