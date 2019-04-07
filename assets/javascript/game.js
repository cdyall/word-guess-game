$(document).ready(function () {

    var wordList = ["chelsea piers","reflecting pools",
    "one world trade","empire state building","central park",
    "ststue of liberty","rockefeller center","moma", 
    "brooklyn bridge","time square","charlie parker house", 
    "guggenheim","chinatown"];

    const maxGuess = 10
    var pauseGame = false

    var pGuessed = []
    var gWord = []
    var mWord
    var nGuess
    var wins = 0

    resetGame()

    // Wait for key press
    document.onkeypress = function(event) {
        // Make sure key pressed is an alpha character
        if (isAlpha(event.key) && !pauseGame) {
            checkForLetter(event.key.toUpperCase())
        }
    }

    // Game Functions
    // Check if letter is in word & process
    function checkForLetter(letter) {
        var foundLetter = false
        var correctSound = document.createElement("audio")
        var incorrectSound = document.createElement("audio")
        correctSound.setAttribute("src", "assets/sounds/ding.wav")
        incorrectSound.setAttribute("src","assets/sounds/horn.mp3")

        // Search string for letter
        for (var i=0, j= mWord.length; i<j; i++) {
            if (letter === mWord[i]) {
                gWord[i] = letter
                foundLetter = true
                correctSound.play()
                // If guessing word matches random word
                if (gWord.join("") === mWord) {
                    // Increment # of wins
                    wins++
                    pauseGame = true
                    updateDisplay()
                    setTimeout(resetGame,5000)
                }
            }
        }

        if (!foundLetter) {
            incorrectSound.play()
            // Check if inccorrect guess is already on the list
            if (!pGuessed.includes(letter)) {
                // Add incorrect letter to guessed letter list
                pGuessed.push(letter)
                // Decrement the number of remaining guesses
                nGuess--
            }
            if (nGuess === 0) {
                // Display word before reseting game
                gWord = mWord.split()
                pauseGame = true
                setTimeout(resetGame, 5000)
            }
        }

        updateDisplay()

    }
    // Check in keypressed is between A-Z or a-z
    function isAlpha (ch){
        return /^[A-Z]$/i.test(ch);
    }

    function resetGame() {
        nGuess = maxGuess
        pauseGame = false

        // Get a new word
        mWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase()
        // console.log(mWord)

        // Reset word arrays
        pGuessed = []
        gWord = []

        // Reset the guessed word
        for (var i=0, j=mWord.length; i < j; i++){
            // Put a space instead of an underscore between multi word "words"
            if (mWord[i] === " ") {
                gWord.push(" ")
            } else {
                gWord.push("_")
            }
        }

        // Update the Display
        updateDisplay()
    }

    function updateDisplay () {
        document.getElementById("totalWins").innerText = wins
        document.getElementById("currentWord").innerText = gWord.join("")
        document.getElementById("remainingGuesses").innerText = nGuess
        document.getElementById("guessedLetters").innerText =  pGuessed.join(" ")
    }
})