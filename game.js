var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

//3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("Level " + level);
        nextSequence();
        started = true;
    }
});


//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function (){
 
  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");

     /*4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern */
    userClickedPattern.push(userChosenColour);

    //console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    /*2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.*/
    checkAnswer(userClickedPattern.length-1);

});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel){

    /*3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".*/
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        console.log("success");

    /*4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.*/
        if(userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function(){
            nextSequence();
        },1000);
        }

    }
    else{
        console.log("wrong");

        //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");

        //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

       //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
       $("#level-title").text("Game Over, Press Any Key to Restart");


        //2. Call startOver() if the user gets the sequence wrong.
        startOver();

    }

}

function nextSequence(){

    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

   //1. Use jQuery to select the button with the same id as the randomChosenColour
  /*2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.*/

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  /*3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.*/

  /* var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play(); */

   /*4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.*/

   playSound(randomChosenColour);


}

//2. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name){

    //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour){

    //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColour).addClass("pressed");

    /*3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds. */
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    },150);
}

//1. Create a new funaction called strtOver().
function startOver(){

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}