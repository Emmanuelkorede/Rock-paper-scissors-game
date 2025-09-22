let score = JSON.parse(localStorage.getItem('score')) || {
    wins : 0 ,
    losses : 0 ,
    ties : 0 
}

const rockButton = document.querySelector('.rock') ;
const paperButton = document.querySelector('.paper') ;
const scissorsButton = document.querySelector('.scissors') ;
updateScore();

rockButton.addEventListener('click', () => {
    playgame('rock');
}) ;

paperButton.addEventListener('click', () => {
    playgame('paper') ;
})

scissorsButton.addEventListener('click', () => {
    playgame('scissors') ;
})

document.querySelector('.reset-btn').addEventListener('click' , () =>{
hiddenConfrimationMessage() ;
})

document.querySelector('.auto-play').addEventListener('click' , () =>{
    autoPlay() ;
})

// playing the game
function playgame(playermove) {
    const computerMove = pickComputerMove() ;
    let result = "";

    if (playermove === 'rock') {

        if ( computerMove === 'rock') {
            result = 'tie'
        } else if ( computerMove === 'paper' ) {
            result = 'lose'
        } else if ( computerMove === 'scissors' ) {
            result = 'win'
        }

    }

    else if ( playermove === 'paper') {

         if ( computerMove === 'rock') {
            result = 'win'
        } else if ( computerMove === 'paper' ) {
            result = 'tie'
        } else if ( computerMove === 'scissors' ) {
            result = 'lose'
        }
        

    }

    else if ( playermove === 'scissors') {

         if ( computerMove === 'rock') {
            result = 'lose'
        } else if ( computerMove === 'paper' ) {
            result = 'win'
        } else if ( computerMove === 'scissors' ) {
            result = 'tie'
        }
        
    }

    if ( result === 'win') {
       score.wins++
    } else if ( result === 'lose') {
        score.losses++
    } else if ( result === 'tie') {
        score.ties++
    }

    localStorage.setItem('score', JSON.stringify(score)) ;

    document.querySelector('.results').innerHTML = result;

    document.querySelector('.moves').innerHTML = `you <img src="images/${playermove}-images-icon.png" class="moves-display">
     - computer  <img src="images/${computerMove}-images-icon.png" class="moves-display"> `
    updateScore() ;
}  

//generating computer move
function pickComputerMove() {
    let randomNumber = Math.random() ;

    let computerMove = "" ;

    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = "rock"
    } else if ( randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = "paper"
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = "scissors"
    }

    return computerMove ;
}


// updating score 
function updateScore() {
    document.querySelector('.score').innerHTML = ` wins :${score.wins} | lossses :${score.losses}  | ties :${score.ties}`
}

//reset score button
function resetScore() {
    score = {
    wins : 0 ,
    losses : 0 ,
    ties : 0 
}
localStorage.removeItem('score') ;
updateScore() ;
document.querySelector('.results').innerHTML = 'scores have been reset';
document.querySelector('.moves').innerHTML = '';
} 

//confirm to reset or not
function hiddenConfrimationMessage() {
    document.querySelector('.confirmation-message').innerHTML = `
    Are you sure you want to reset scores
    <button class="confirm-yes">Yes</button>
    <button class="confrim-no">No</button>
    `

    document.querySelector('.confirm-yes').addEventListener('click' , () =>{
        resetScore() ;
        document.querySelector('.confirmation-message').innerHTML = '';
    });

    document.querySelector('.confrim-no').addEventListener('click', ()=>{
        document.querySelector('.confirmation-message').innerHTML ='';
    })
}

let isAutoPlaying = false ;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
           const  playermove = pickComputerMove() ;
            playgame(playermove)
        }, 2000);
        isAutoPlaying = true ;
        document.querySelector('.auto-play').innerHTML = "stop playing" ;
    }else {
        clearInterval(intervalId) ;
        isAutoPlaying = false ;
        document.querySelector('.auto-play').innerHTML = "auto play"
    }
}