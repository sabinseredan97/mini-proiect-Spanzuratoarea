var wordToGuess = document.getElementById("wordInput");
var gameInProgress = true;
let tries = 6;
let mistakes = 0;
let rightChoices = 0;
let answerArray = [];
let refreshMessage = "Please refresh the page if you want to play again";

submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener('click', generateButtons);
submitBtn.addEventListener('click', hideInput);
document.getElementById("tries").innerHTML = tries;

function generateButtons() {
    letterBtns = document.getElementById("letterBtns");
    for (let i = 0, btnLetter = 97; i < 26; ++i, ++btnLetter) {
        let button = document.createElement("button");
        button.innerHTML = String.fromCharCode(btnLetter);
        button.id = String.fromCharCode(btnLetter);
        button.className = "btns btns-lg btns-primary m-2";
        button.onclick = function() {checkGameState(button.value)};
        button.value = String.fromCharCode(btnLetter);
        letterBtns.appendChild(button);
    }
    createAnswerArray();
    document.getElementById("guessed-letters").innerHTML = answerArray.join(" ");
}

function hideInput() {
    document.getElementById('wordInput').type = "password";
}

function checkGameState(letter) {
    if (gameInProgress) {
        let found = false;
        for (let i = 0; i < wordToGuess.value.length; ++i) {
            if (wordToGuess.value[i] === letter) {
                found = true;
                answerArray[i] = wordToGuess.value[i];
                document.getElementById("guessed-letters").innerHTML = answerArray.join(" ");
                ++rightChoices;
            }
        }
        document.getElementById(letter).disabled = true;
        
        if (found === false) {
            ++mistakes;
            updateMistakes();
            updateHangManImg();
        }
    }
    if (checkIfGameWon()) {
        document.getElementById("endGameMessage").innerHTML = "Congratulations you guessed the word. " + refreshMessage;
        gameInProgress = false;
    } else if (checkIfGameLost()) {
        document.getElementById("endGameMessage").innerHTML = "You lost this round. " + refreshMessage;
        gameInProgress = false;
    }
}

function updateMistakes() {
    document.getElementById("mistakes").innerHTML = mistakes;
}

function updateHangManImg() {
    document.getElementById("hangmanImg").src = "./images/" + mistakes + ".jpg";
}

function createAnswerArray() {
    for (let i = 0; i < wordToGuess.value.length; ++i) {
        answerArray[i] = "_";
    }
    document.getElementById("guessed-letters").innerHTML = answerArray.join(" ");
}

function checkIfGameWon() {
    if (rightChoices === wordToGuess.value.length) {
        return true;
    }
    return false;
}

function checkIfGameLost() {
    if (mistakes === tries) {
        return true;
    }
    return false;
}