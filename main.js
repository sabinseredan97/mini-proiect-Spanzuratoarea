const dictionary = [];
let inputWord = document.getElementById("wordInput");
let submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener('click', addWord);

function addWord() {
    if (checkIfInputIsValid(inputWord.value) == true) {
        if (dictionary.includes(inputWord.value) == true) {
            alert("This word already exists in the dictionary");
        } else if (dictionary.includes(inputWord.value) == false) {
            dictionary.push(inputWord.value);
            alert("Your word has been successfully added to the dictionary");
        }
    } else {
        alert("Please insert a valid word");
    }
}

function checkIfInputIsValid(str) {
    let isLetter = true;
    if (str.length > 0) {
        for (let i = 0; i < str.length; ++i) {
            if (!(str[i] >= 'a' && str[i] <= 'z' || str[i] <= 'A' && str[i] >= 'Z')) {
                isLetter = false;
                break;
            }
        }
        if (isLetter == true) {
            return true;
        }
    }
    return false;
}