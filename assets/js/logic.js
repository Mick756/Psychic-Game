var maxTries = 15;
document.onkeyup = function (event) {
    var uInput = event.key;
    if (!alphabet.includes(uInput.toLowerCase())) {
        return;
    }
    if (event.shiftKey && uInput === "S") {
        startGame();
    } else if (event.shiftKey && uInput === "R") {
        alert("Reseting game!")
        reset();
        return;
    } else if (game.started && !event.shiftKey && uInput !== "S" && uInput !== "R") {
        if (game.filledInLetters.includes(uInput.toLowerCase()) || game.incorrectLetters.includes(uInput.toLowerCase())) {
            document.getElementById("userInput").innerHTML = "You already guessed this letter!";
            return;
        }
        if (wordContainsCharacter(game.wordToGuess, uInput)) {
            game.filledInLetters.push(uInput);
            game.triesLeft--;
            if (!formatToUnderscoreString(game.wordToGuess, game.filledInLetters).includes("_")) {
                document.getElementById("lettersGuessed").innerHTML = game.incorrectLetters;
                document.getElementById("userInput").innerHTML = "You are amazing!";
                document.getElementById("messageBox").innerHTML = "Press Shift + s to play again!";
                document.getElementById("wordToGuess").innerHTML = "You guessed: " + game.wordToGuess + "! Nice job!";
                updateStats();
                game.wins++;
                game.started = false;
                return;
            }
        } else {
            game.incorrectLetters.push(uInput);
            game.triesLeft--;
        }
        if (game.triesLeft === 0) {
            document.getElementById("lettersGuessed").innerHTML = game.incorrectLetters;
            document.getElementById("userInput").innerHTML = "You are terrible!";
            document.getElementById("messageBox").innerHTML = "Press Shift + r to reset!";
            document.getElementById("wordToGuess").innerHTML = "You could not guess: " + game.wordToGuess + "! Try again!";
            updateStats();
            game.losses++;
            game.started = false;
            return;
        }
        document.getElementById("lettersGuessed").innerHTML = game.incorrectLetters;
        document.getElementById("wordToGuess").innerHTML = "Guess this word: " + formatToUnderscoreString(game.wordToGuess, game.filledInLetters);
        document.getElementById("userInput").innerHTML = "You guessed: " + uInput;
        updateStats();
    }
}

// Theme: Minecraft
var game = {
    started: false,
    playerName: "",
    wordToGuess: "",
    incorrectLetters: [""],
    filledInLetters: [""],
    triesLeft: maxTries,
    wins: 0,
    losses: 0
}
var words = ["Player", "Steve", "Enderman", "Skeleton", "Zombie", "Chicken", "Cow", "Sheep", "Pig", "Witch",
    "Wither", "Villager", "Cobblestone", "Dirt", "Obsidian", "Diamond", "Iron", "Gold", "Emerald", "Spruce",
    "Birch", ""]
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
    "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function assignWordToGuess() {
    game.wordToGuess = words[Math.floor(Math.random() * words.length)];
}

function startGame() {
    game.incorrectLetters = [""];
    game.filledInLetters = [""];
    game.triesLeft = maxTries;
    game.started = true;
    game.playerName = prompt("Can we get your name? If you don't give it you name is noob.");
    if (game.playerName === "") {
        nagame.playerNameme = "Noob";
    }
    document.getElementById("messageBox").innerHTML = "Look at the word and guess a letter " + game.playerName + "!";
    assignWordToGuess();
    document.getElementById("wordToGuess").innerHTML = "Guess this word: " + formatToUnderscoreString(game.wordToGuess, game.filledInLetters);

}
function updateStats() {
    document.getElementById("stats").innerHTML = "Tries Left: " + game.triesLeft + " Wins: " + game.wins + " Losses: " + game.losses;
}
function reset() {
    game.incorrectLetters = [""];
    game.filledInLetters = [""];
    game.wins = 0;
    game.losses = 0;
    game.triesLeft = maxTries;
    startGame();
    updateStats();
}


function formatToUnderscoreString(word, guessed) {
    var newCharArray = [];
    var wordToArray = word.split('');
    for (var i = 0; i < wordToArray.length; i++) {
        var character = wordToArray[i];
        if (guessed.length !== 0) {
            if (guessed.includes(character.toLowerCase())) {
                newCharArray.push(character + " ");
            } else {
                newCharArray.push("_ ");
            }
        } else {
            newCharArray.push("_ ");
        }
    }
    return newCharArray.join('');
}

function wordContainsCharacter(word, character) {
    var arr = word.toLowerCase().split('');
    if (arr.includes(character)) {
        return true;
    }
    return false;
}