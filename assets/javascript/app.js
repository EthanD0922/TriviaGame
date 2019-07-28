var questions = [
    {
        question: "First letter of Alphabet", //string that holds the question
        correctNum: 1,  //used to set the answer in the nextQuestion() 
        answerChoices: ["b", "a" ,"c", "d"] // all the options the correct answer is in the spot equal to the number above 

    },
    {
        question: "The Sky is...",
        correctNum: 2,
        answerChoices: ["red", "pizza", "blue" ,"black"]
    },
    {
        question: "Apples are a type of...",
        correctNum: 0,
        answerChoices: ["fruit", "horse" , "dog" , "cow"]
    }

]
// stats
var correctAns = 0
var wrongAns = 0 
var notAns = 0 

//used to advance through the questions
var currentQuestion = 0

//holds the correct answer incase answered wrong
var x = ""

//vars for the timer
var timer = 20 
var intervalId;

//basic function to restart the game. Hides the game button after started, resets stats, and ques the first question.
function start(){
    correctAns = 0
    wrongAns = 0 
    notAns = 0 
    $("#start").hide()
    nextQuestion()
}

//when all questions have been asked, shows the start button to play again, displays stats.
function gameOver(){
    clearScrn()
    $("#question").text("Game Over")
    $("#answers").append("<h4> Correct: " + correctAns + "</h4>")
    $("#answers").append("<h4> Wrong: " + wrongAns + "</h4>")
    $("#answers").append("<h4> Not Answer: " + notAns + "</h4")
    $("#start").show()
}

//used to set the questions into play
function nextQuestion() {
    $("#question").text(questions[currentQuestion].question)
    $("#answers").empty()
    
    number = 20
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000)

    for (i = 0 ; i < 4 ; i++) {
        if (i === questions[currentQuestion].correctNum){
            $("#answers").append("<button class='guess' value='" + i + "'>" + questions[currentQuestion].answerChoices[i] + "")
            x = questions[currentQuestion].answerChoices[i]
        }
        else {
            $("#answers").append("<button class='guess' value='" + i + "'>" + questions[currentQuestion].answerChoices[i] + "</button>")
        }
    }
}

//if answer is correct starts 3 sec timout and displays correct
function corectScrn(){

    setTimeout(transitionScrn, 2000)
    clearInterval(intervalId)
    clearScrn()
    $("#question").append("<h1> CORRECT!! </h1>")
}

//if answer is wrong starts 3 sec timout and displays correct answer
function wrongScrn(){
    
    setTimeout(transitionScrn, 2000)
    clearInterval(intervalId)
    clearScrn()
    $("#question").append("<h1> Wrong guess! </h1>")
    $("#answers").append("<h3> The Correct Answer Was: " + x + "</h3>")
    
}


// used to check and see if theres anymore questions left after the correct/wrong transition
function transitionScrn() {
    currentQuestion++
    if (currentQuestion === questions.length){
        gameOver()
        
    }
    else{
        nextQuestion()
        
    }
}

//button to start the game
$("#start").on("click" , function(){
    start()
    
})

//the function that checks to see if the answer is correct. uses the values of 
//the button and the var correctNum in each object to see if its right. 
$(document).on("click", ".guess" ,  function(){
    if ($(this).val() == questions[currentQuestion].correctNum){
        correctAns++
        corectScrn()
    }
    else{
        wrongAns++
        wrongScrn()
    }
})

//used to clear the game screen.
function clearScrn() {
    $("#answers").empty()
    $("#question").empty()
}

//function for the core timer
function decrement() {
    number--
    $("#timer").show().text("Time: " + number)
    console.log(number)
    if (number === 0){
        
    notAns++

    clearScrn()
    $("#question").append("<h1> Time's Up! </h1>")
    $("#answers").append("<h3> The Correct Answer Was: " + x + "</h3>")
    }
}
