var questions = [
    {
        question: "Dungeons and Dragons was first published in?", //string that holds the question
        correctNum: 1,  //used to set the answer in the nextQuestion() 
        answerChoices: ["1981", "1974" ,"1989", "1965"] // all the options the correct answer is in the spot equal to the number above 

    },
    {
        question: "Who created D&D",
        correctNum: 0,
        answerChoices: ["Gary Gygax", "Bill Gates", "J. R. R. Tolkin" ,"Guru Darji"]
    },
    {
        question: "Which class was not one of the three orignal",
        correctNum: 2,
        answerChoices: ["Magic-User", "Fighting-Man", "Druid" ,"Cleric"]
    },
    {
        question: "Which was not an original race",
        correctNum: 0,
        answerChoices: ["Tiefling", "Human" , "Dwarf" , "Halfling"]
    },
    {
        question: "Which is the most current edition of D&D",
        correctNum: 3,
        answerChoices: ["3rd", "3.5/Pathfinder", "6th" ,"5th"]
    },
    {
        question: "What company has the rights and coninues to publish the books",
        correctNum: 2,
        answerChoices: ["Sorcerers of the Sea", "Mages of the Mountains", "Wizards of the Coast" ,"Amazon"]
    },
    {
        question: "Which is not an ability in D&D 5e",
        correctNum: 1,
        answerChoices: ["Strength", "Power", "Dexterity" ,"Charisma"]
    },
    {
        question: "Who, according to D&D lore, is the lord of Nine Hells",
        correctNum: 0,
        answerChoices: ["Azmodeus", "Baalzebul", "Tarrasque" ,"Tiamat"]
    },
    {
        question: "Which is not a skill in 5e",
        correctNum: 3,
        answerChoices: ["Insight", "Arcana", "Nature" ,"Smithing"]
    },
    {
        question: "How much gold is a platinum piece worth",
        correctNum: 2,
        answerChoices: ["100", "500", "10" ,"5"]
    },

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
    currentQuestion = 0
    $("#start").hide()
    clearScrn()
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
    clearScrn()
    $("#question").text(questions[currentQuestion].question)
    
    number = 20
    $("#timer").text("Time: " + number)
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000)

    for (i = 0 ; i < 4 ; i++) {
        if (i === questions[currentQuestion].correctNum){
            $("#answers").append("<button class='guess btn-lg btn-block' value='" + i + "'><i class='fab fa-d-and-d'> " + questions[currentQuestion].answerChoices[i] + " <i class='fab fa-d-and-d'>")
            x = questions[currentQuestion].answerChoices[i]
        }
        else {
            $("#answers").append("<button class='guess btn-lg btn-block' value='" + i + "'><i class='fab fa-d-and-d'> " + questions[currentQuestion].answerChoices[i] + " <i class='fab fa-d-and-d'></button>")
        }
    }
}

//if answer is correct starts 3 sec timout and displays correct
function corectScrn(){

    setTimeout(transitionScrn, 2000)
    clearInterval(intervalId)
    clearScrn()
    $("#question").append("<h1> CORRECT!! </h1>")
    $("#dicePic").append("<img class='diceimg' src='assets/images/nat20.png'>")
}

//if answer is wrong starts 3 sec timout and displays correct answer
function wrongScrn(){
    
    setTimeout(transitionScrn, 2000)
    clearInterval(intervalId)
    clearScrn()
    $("#question").append("<h1> Wrong guess! </h1>")
    $("#answers").append("<h3> The Correct Answer Was: " + x + "</h3>")
    $("#dicePic").append("<img class='diceimg' src='assets/images/nat1.png'>")
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
    $("#timer").empty()
    $("#dicePic").empty()
}

//function for the core timer
function decrement() {
    number--
    $("#timer").text("Time: " + number)
    if (number === 0){
    
        clearInterval(intervalId)
    setTimeout(transitionScrn, 2000)
    notAns++

    clearScrn()
    $("#question").append("<h1> Time's Up! </h1>")
    $("#answers").append("<h3> The Correct Answer Was: " + x + "</h3>")

    }
}
