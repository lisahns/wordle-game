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

// add functionality to keyboard

const keys = document.querySelectorAll(".keyboard-button");

for (let i =0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
        const key = target.getAttribute("data-key");
        console.log(key);
    }
}