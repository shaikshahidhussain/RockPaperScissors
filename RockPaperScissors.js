let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector(".resetBtn");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const drawSound = document.getElementById("draw-sound");
const resetSound = document.getElementById("reset-sound");
const backgroundSound = document.getElementById("background-sound");
const musicIcon = document.getElementById("music-icon");

backgroundSound.play();

const genCompChoice = () =>{
    const options = ["Rock", "Paper", "Scissors"];
    const randIdx = Math.floor(Math.random()* 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "Game was draw ! Play again"
    msg.style.backgroundColor = "#023047";
    drawSound.play()
};

const showWinner = (userWin, userChoice, compChoice) =>{
    if(userWin){
        userScore ++ ;
        userScorePara.innerText = userScore;
        msg.innerText = ` Your choice is ${userChoice} and Computer choice is ${compChoice} \n YOU WIN !`;
        msg.style.backgroundColor = "green";
        winSound.play();
    }else{
        compScore++ ;
        compScorePara.innerText =compScore;
        msg.innerText = ` Your choice is ${userChoice} and Computer choice is ${compChoice} \n YOU LOSE !`;
        msg.style.backgroundColor = "red";
        loseSound.play();
    }
}

const playGame= (userChoice) =>{
    //genetare the computer choice
    const compChoice = genCompChoice(); 
    if(userChoice === compChoice) {
        //Draw game
        drawGame();
    } else{
        let userWin = true;
        if (userChoice ==="Rock"){
            // computer choice may select scissors,paper
            userWin = compChoice === "Paper" ? false : true;
        }else if (userChoice === "Paper"){
            // computer choice may select scissors,rock
            userWin = compChoice === "Scissors" ? false : true ;
        }else if (userChoice === "Scissors") {
            //computer choice may select paper, rock
            userWin = compChoice === "Rock" ? false : true;
        }
        showWinner(userWin, userChoice,compChoice);
    }
};
choices.forEach((choice) => {
    choice.addEventListener("click", () =>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

resetBtn.addEventListener("click", () =>{
    userScore = 0;
    compScore = 0;
    msg.innerText = "Start Playing !"
    msg.style.backgroundColor = "#023047"
    userScorePara.innerText = 0;
    compScorePara.innerText = 0;
    resetSound.play();
});

musicIcon.addEventListener("click", () => {
    if (backgroundSound.paused) {
        backgroundSound.play();
        musicIcon.src = "images/music-on-icon.png"; // Change icon to "on" state
    } else {
        backgroundSound.pause();
        musicIcon.src = "images/music-off-icon.png"; // Change icon to "off" state
    }
});