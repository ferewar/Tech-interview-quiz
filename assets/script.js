// questions and answers
const questions = [
    { question: "What keyword is used to declare a variable in Javascript?", answers: ["var", "let", "const", "all of them"], correctAnswer: "all of them" },
    { question: "What is the purpose of template literals in JavaScript?", answers: ["To declare variables", "To create functions", "To enable asynchronous programing", "To concatenate strings with embedded expressions"], correctAnswer:"To concatenate strings with embedded expressions"},
    { question: "How do you comment a single line in JavaScript?", answers: ["<!--comment-->", "/*comment*/", "//comment", "--comment--"], correctAnswer: "//comment" },
    { question: "Which function is used to print something to the console?", answers: ["log()", "print()", "console.log()", "display()"], correctAnswer: "console.log()" },
    { question: "What is the purpose of the === operator in javascript?", answers: ["Assignment", "Equality comparison", "Addition", "Logican AND"], correctAnswer: "Equality comparison" },
    { question: "How do you create an array in Javascript?", answers: ["var myArray={}", "var myArray=[]", "array myArray=[]", "set myArray=new Array()"], correctAnswer: "var myArray=[]" },
    { question: "What is the output of the following code snippet?\n\n```javascript\nconsole.log(1 + '1' - 1);\n```", answers: [ "11", " 1", "10", "2"], correctAnswer: "2"},
    { question: "What is a closure in JavaScript", answers: ["A specific type of function", "A combination of a function and the lexical environment within which that function was declared", "A way to close a program", "A way to lock variables"], correctAnswer:"A combination of a function and the lexical environment within which that function was declared"},
    { question: "What is the this keyword in JavaScript?", answers: ["It refers to the current object", "It refers to the previous object", "It refers to the global object", "It refers to the parent object"], correctAnswer:"It refers to the current object"}
];
//Start variables to keep track of the quizz
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 200; // Set time limit
//get the references from the HTML elements
const startBtn = document.getElementById("start-btn");
const answerButtonsContainer = document.getElementById("answer-buttons");
const saveBtn = document.getElementById("save-btn");
const initialsInput = document.getElementById("initials-input");
const questionContainer = document.getElementById("question-container");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
//add event listeners to the buttons
startBtn.addEventListener("click", startQuiz);
saveBtn.addEventListener("click", saveScore);
//function to start the quizz
function startQuiz() {
    startBtn.disabled = true;
    saveBtn.disabled = true;
    timer = setInterval(updateTimer, 1000);
    showQuestion();
}
//function to display a question
function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.innerHTML = currentQuestion.question;
        //innerHTML is an HTML element property that has two uses for web developers:
        // 1) You can use it to get the internal HTML content of any HTML element as an HTML string. 2) You can also use it to set or change elements' innerHTML content.
        //what is doing is changing whats currently inside the box with the id answer-buttons
        answerButtonsContainer.innerHTML = "";

        // Dynamically generate buttons for each answer
        currentQuestion.answers.forEach((answer, index) => {
            const answerBtn = document.createElement("button");
            answerBtn.textContent = answer;
            answerBtn.addEventListener("click", () => answerQuestion(answer, currentQuestion.correctAnswer));
            answerButtonsContainer.appendChild(answerBtn);
        });

    } else {
        endQuiz();
    }
}
//function when user answers a question
function answerQuestion(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
    } else {
        timeRemaining -= 10; // Subtract 10 seconds from the timer for incorrect answers
    }

    currentQuestionIndex++;
    showQuestion();
}
//function to update the timer
function updateTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        timerDisplay.textContent = `Time: ${timeRemaining}`;
    } else {
        endQuiz();
    }
}
//function to end the quiz
function endQuiz() {
    clearInterval(timer);
    questionContainer.innerHTML = "Quiz Over!";
    startBtn.disabled = false;
    saveBtn.disabled = false;
    answerButtonsContainer.innerHTML = "";
    scoreDisplay.textContent = `Score: ${score}`;
}
//function to save the score
function saveScore() {
    const initials = initialsInput.value.trim();

    if (initials !== "") {
        // Save the score and initials (you can store it in an array or use local storage)
        // Example: localStorage.setItem("highScores", JSON.stringify(highScoresArray));
        //Dynamically construct strings by embeding variabvles or expression within the brackets and using ${} syntax, in this case is a placeholder that gets replaced with the value initials :)!
        alert(`Score saved for ${initials}!`);
        initialsInput.value = "";
    } else {
        alert("Please enter your initials before saving the score.");
    }
}
//function to provide feedback if the answer is correct or incorrect
function answerQuestion(selectedAnswer, correctAnswer) {
    const feedbackContainer = document.createElement("div");

    if (selectedAnswer === correctAnswer) {
        score++;
        feedbackContainer.textContent = "Correct!";
    } else {
        timeRemaining -= 10; // Subtract 10 seconds for incorrect answers
        feedbackContainer.textContent = `Wrong! The correct answer is: ${correctAnswer}`;
    }

    // Append the feedback container to the quiz container
    document.getElementById("quiz-container").appendChild(feedbackContainer);

    // Remove the feedback after a short delay 
    setTimeout(() => {
        feedbackContainer.remove();
        currentQuestionIndex++;
        showQuestion();
    }, 1500);
}
//function to save the score to the local storage
function saveScore() {
    const initials = initialsInput.value.trim();

    if (initials !== "") {
        const savedScores = JSON.parse(localStorage.getItem("highScores")) || [];
        savedScores.push({ initials, score });
        savedScores.sort((a, b) => b.score - a.score); // Sort scores in descending order
        localStorage.setItem("highScores", JSON.stringify(savedScores));
        alert(`Score saved for ${initials}!`);
        initialsInput.value = "";
    } else {
        alert("Please enter your initials before saving the score.");
    }
}
//function to display high scores
function showHighScores() {
    const highScoresContainer = document.getElementById("high-scores-container");
    highScoresContainer.innerHTML = "<h2>High Scores</h2>";

    const savedScores = JSON.parse(localStorage.getItem("highScores")) || [];

    if (savedScores.length > 0) {
        const scoresList = document.createElement("ol");

        savedScores.forEach((entry, index) => {
            const scoreItem = document.createElement("li");
            scoreItem.textContent = `${entry.initials}: ${entry.score}`;
            scoresList.appendChild(scoreItem);
        });

        highScoresContainer.appendChild(scoresList);
    } else {
        highScoresContainer.innerHTML += "<p>No high scores available. Start playing to make some!</p>";
    }
}