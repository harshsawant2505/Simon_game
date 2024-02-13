var gamePattern = []
var buttonColors = ["red", "blue", "green", "yellow"]


var userClickedPattern = []


var started = false;
var level = 1;

$(document).keydown(function(){

     if(!started){

          $("#level-title").text("level "+ level)
          setTimeout(function(){
               nextSequence();
          },500)
          started = true

     }
    
})



$(".btn").click(function(){

     /// getting the color clicked id///
     var userChosenColor = $(this).attr("id")
     console.log(userChosenColor)
     userClickedPattern.push(userChosenColor)

///// playin corresponding sounds and animations and checking answer/////
     playSound(userChosenColor)
     animatePress(userChosenColor)
     checkAnswer(userClickedPattern.length - 1)
})




function nextSequence(){
     userClickedPattern = []
    
    var randomNumber = Math.floor(Math.random() * 4)
     var randomChosenColor = buttonColors[randomNumber]

     gamePattern.push(randomChosenColor);

     $("#" +randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)

    playSound(randomChosenColor)
    $("#level-title").text("level "+ level)
    
}

function playSound(name){
     var audio = new Audio("./sounds/" +name+ ".mp3")
    audio.play();

}

function animatePress(currentColor){
     $("#"+currentColor).addClass("pressed")
     setTimeout(function(){
          $("#"+currentColor).removeClass("pressed")
     }, 100)
}

function checkAnswer(currentLevel){

     if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
          

          if(userClickedPattern.length === gamePattern.length){
               console.log("success")  
               level++; 
              setTimeout(function(){
               nextSequence()
              }, 1000)
          }
     }else{
          console.log("wrong");
          $("body").addClass("game-over")
          setTimeout(function(){
               $("body").removeClass("game-over")
          },200)
          playSound("wrong")

          $("#level-title").text("Game Over, Press Any Key to Restart")
          startOver()
     }


}
function startOver(){
     gamePattern = []
     started = false
     level =0
}