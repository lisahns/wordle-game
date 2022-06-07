const height = 6; //number of guesses
const width = 5; // lenght of word

var row = 0; //current guess
var col = 0; //current letter for that attempt

var gameOver = false;

const words = ['HELLO', 'WHICH', 'OTHER', 'THESE', 'CLOUD', 'APPLE', 'QUEEN', 'TOWER'];

//choose word randomly from words array
let rightGuessString = words[Math.floor(Math.random() * words.length)]
console.log(rightGuessString);

//create board
function initBoard() {

    for (let i = 0; i < height; i++) {
        // let row = document.createElement("div")
        // row.className = "letter-row"
        
        for (let j = 0; j < width; j++) {
            let box = document.createElement("div");
            box.id = i.toString() + "-" + j.toString();
            box.classList.add("box")
            box.innerText = "";
            //console.log(box);
            document.getElementById("game-board").appendChild(box);
    }
}
}
initBoard()

//listen for key press

document.addEventListener("keyup", (e) => {
    if (gameOver) {
        return;
    } //alert(e.code);
    //enter only 5 letters
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < width) {
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            // console.log(currTile);
            if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col += 1;
            }
        }
    }
    //use backspace
    else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
            col -=1;
        }
        let currTile = document.getElementById(row.toString() + "-" + col.toString());
        currTile.innerText = "";
    }
    // use enter
    else if (e.code == "Enter") {
        update();
        row +=1; //start new row
        col = 0; //start at 0 for new row
    }

    //shows correct answer, in case player does not find the word
    if (!gameOver && row == height) {
        gomeOver = true;
        document.getElementById("answer").innerText = rightGuessString;
    }
})

function update() {
    let correct = 0;
    for (let i = 0; i < width; i++) {
        let currTile = document.getElementById(row.toString() + "-" + i.toString());
        let letter = currTile.innerText;
        
//is it in the correct position?
        if (rightGuessString[i] == letter) {
            currTile.classList.add("correct");
            correct += 1;
        } 

        //is it in the word?
        else if (rightGuessString.includes(letter)) {
            currTile.classList.add("present");
        } 

        //not in the word
        else {
            currTile.classList.add("absent");
        }
        if (correct== width) {
            gameOver == true;
        }
    }
}
// document.addEventListener("keyup", (e) => {

//     if (guessesRemaining === 0) {
//         return
//     }

//     let pressedKey = String(e.key)
//     if (pressedKey === "Backspace" && nextLetter !== 0) {
//         deleteLetter()
//         return
//     }

//     if (pressedKey === "Enter") {
//         checkGuess()
//         return
//     }

//     let found = pressedKey.match(/[a-z]/gi)
//     if (!found || found.length > 1) {
//         return
//     } else {
//         insertLetter(pressedKey)
//     }
// })


// function insertLetter (pressedKey) {
//     if (nextLetter === 5) {
//         return
//     }
//     pressedKey = pressedKey.toLowerCase()

//     let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
//     let box = row.children[nextLetter]
//     box.textContent = pressedKey
//     box.classList.add("filled-box")
//     currentGuess.push(pressedKey)
//     nextLetter += 1
// }

// function deleteLetter () {
//     let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
//     let box = row.children[nextLetter - 1]
//     box.textContent = ""
//     box.classList.remove("filled-box")
//     currentGuess.pop()
//     nextLetter -= 1
// }

// function checkGuess () {
//     let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
//     let guessString = ''
//     let rightGuess = Array.from(rightGuessString)

//     for (const val of currentGuess) {
//         guessString += val
//     }

//     if (guessString.length != 5) {
//         alert("Not enough letters!")
//         return
//     }

//     if (!WORDS.includes(guessString)) {
//         alert("Word not in list!")
//         return
//     }

    
//     for (let i = 0; i < 5; i++) {
//         let letterColor = ''
//         let box = row.children[i]
//         let letter = currentGuess[i]
        
//         let letterPosition = rightGuess.indexOf(currentGuess[i])
//         // is letter in the correct guess
//         if (letterPosition === -1) {
//             letterColor = 'grey'
//         } else {
//             // now, letter is definitely in word
//             // if letter index and right guess index are the same
//             // letter is in the right position 
//             if (currentGuess[i] === rightGuess[i]) {
//                 // shade green 
//                 letterColor = 'green'
//             } else {
//                 // shade box yellow
//                 letterColor = 'yellow'
//             }

//             rightGuess[letterPosition] = "#"
//         }

//         let delay = 250 * i
//         setTimeout(()=> {
//             //shade box
//             box.style.backgroundColor = letterColor
//             shadeKeyBoard(letter, letterColor)
//         }, delay)
//     }

//     if (guessString === rightGuessString) {
//         alert("You guessed right! Game over!")
//         guessesRemaining = 0
//         return
//     } else {
//         guessesRemaining -= 1;
//         currentGuess = [];
//         nextLetter = 0;

//         if (guessesRemaining === 0) {
//             alert("You've run out of guesses! Game over!")
//             alert(`The right word was: "${rightGuessString}"`)
//         }
//     }
// }

// function shadeKeyBoard(letter, color) {
//     for (const elem of document.getElementsByClassName("keyboard-button")) {
//         if (elem.textContent === letter) {
//             let oldColor = elem.style.backgroundColor
//             if (oldColor === 'green') {
//                 return
//             } 

//             if (oldColor === 'yellow' && color !== 'green') {
//                 return
//             }

//             elem.style.backgroundColor = color
//             break
//         }
//     }
// }

// document.getElementById("keyboard-cont").addEventListener("click", (e) => {
//     const target = e.target
    
//     if (!target.classList.contains("keyboard-button")) {
//         return
//     }
//     let key = target.textContent

//     if (key === "Del") {
//         key = "Backspace"
//     } 

//     document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
// })