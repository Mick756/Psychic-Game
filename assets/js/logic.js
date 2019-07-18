/**
 * Variables
 */
var maxTries = 10;
var messageBox = document.getElementById("messageBox");
var userInput = document.getElementById("userInput")
var wordToGuess = document.getElementById("wordToGuess");
var lettersGuessed = document.getElementById("lettersGuessed");
var stats = document.getElementById("stats");


document.onkeyup = function (event) {
    var uInput = event.key.toLowerCase();
    if (game.started === false && uInput === "enter") {
        startGame();
        return;
    }
    if (!alphabet.includes(uInput)) {
        userInput.innerHTML = "Invalid input! Must be a letter!"
        return;
    }
    if (event.shiftKey && uInput === "r") {
        alert("Reseting game!")
        reset();
        return;
    } else if (game.started && !event.shiftKey) {
        if (game.filledInLetters.includes(uInput) || game.incorrectLetters.includes(uInput)) {
            userInput.innerHTML = "You already guessed this letter!";
            return;
        }
        if (wordContainsCharacter(game.wordToGuess, uInput)) {
            game.filledInLetters.push(uInput);
            if (!formatToUnderscoreString(game.wordToGuess, game.filledInLetters).includes("_")) {
                lettersGuessed.innerHTML = formatIncorrectLetters() + "<br>";
                userInput.innerHTML = "You are amazing " + game.playerName + "! +10 Points!";
                messageBox.innerHTML = "Press enter to play again!";
                wordToGuess.innerHTML = "You guessed: " + game.wordToGuess + "! Nice job!";
                game.points = game.points + 10;
                if (game.triesLeft == maxTries) {
                    messageBox.innerHTML = "Double points for not missing any letter! + 10 Points!";
                    game.points = game.points + 10;
                    setTimeout(() => {
                        messageBox.innerHTML = "Press enter to play again!";
                    }, 3000);
                }
                game.started = false;
                updateStats();
                return;
            }
        } else {
            game.incorrectLetters.push(uInput);
            game.triesLeft--;
        }
        if (game.triesLeft === 0) {
            lettersGuessed.innerHTML = formatIncorrectLetters() + "<br>";
            userInput.innerHTML = "You are terrible " + game.playerName + "!";
            messageBox.innerHTML = "Press enter to play again!";
            wordToGuess.innerHTML = "You could not guess: " + game.wordToGuess + "! Try again!";
            game.points = 0;
            game.started = false;
            updateStats();
            return;
        }
        lettersGuessed.innerHTML = formatIncorrectLetters() + "<br>";
        wordToGuess.innerHTML = "Guess this word: " + formatToUnderscoreString(game.wordToGuess, game.filledInLetters);
        userInput.innerHTML = "You guessed: " + uInput;
        updateStats();
    }
}

// Theme: Minecraft
var game = {
    started: false,
    playerName: null,
    wordToGuess: "",
    incorrectLetters: [""],
    filledInLetters: [""],
    triesLeft: maxTries,
    points: 0,
}
var words = ["Player", "Steve", "Enderman", "Skeleton", "Zombie", "Chicken", "Cow", "Sheep", "Pig", "Witch", "Wither", "Villager", "Cobblestone", "Dirt", "Obsidian", "Diamond", "Iron", "Gold", "Emerald", "Spruce", "Birch", "Crafting", "Pickaxe", "Axe", "Sword", "Shovel", "Quartz", "Netherrack", "Wool", "Blaze", "Pigman", "Vex", "Quartz", "Lapis", "Coal", "Grass", "Flower", "Leaves", "Mountains", "Snow", "Creeper"];
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function resetBoard(full) {
    messageBox.innerHTML = "Press Shift + s to start the game!";
    wordToGuess.innerHTML = "Guess this word: ";
    userInput.innerHTML = "You guessed: ";
    lettersGuessed.innerHTML = "<br>";
    if (full) {
        document.getElementById("stats").innerHTML = "Tries Left:  - Points: ";
    } else {
        updateStats();
    }
}

function assignWordToGuess() {
    game.wordToGuess = words[Math.floor(Math.random() * words.length)];
}

function startGame() {
    game.incorrectLetters = [""];
    game.filledInLetters = [""];
    game.triesLeft = maxTries;
    game.started = true;
    resetBoard(false);
    if (game.playerName === "" || game.playerName == null) {
        game.playerName = prompt("Can we get your name? If you don't give it you name is noob.");
        if (game.playerName === "") {
            nagame.playerNameme = "Noob";
        }
    }
    messageBox.innerHTML = "Look at the word and guess a letter " + game.playerName + "!";
    assignWordToGuess();
    wordToGuess.innerHTML = "Guess this word: " + formatToUnderscoreString(game.wordToGuess, game.filledInLetters);

}
function updateStats() {
    stats.innerHTML = "Tries Left: " + game.triesLeft + " - Points: " + game.points;
}
function reset() {
    game.started = false,
    game.playerName = null;
    game.wordToGuess = "";
    game.incorrectLetters = [""];
    game.filledInLetters = [""];
    game.triesLeft = maxTries;
    game.points = 0;
    resetBoard(true);
    startGame();
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

function formatIncorrectLetters() {
    var formatted = "";
    for (var i = 0; i < game.incorrectLetters.length; i++) {
        if (i === game.incorrectLetters.length) {
            formatted = formatted + " " + game.incorrectLetters[i];
        } else {
            formatted = formatted + " " + game.incorrectLetters[i] + " -";
        }
    }
    return formatted.includes("-") ? formatted : "No wrong guesses yet!";
}