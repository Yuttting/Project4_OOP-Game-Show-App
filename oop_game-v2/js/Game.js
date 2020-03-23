/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor(){
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = this.getRandomPhrase();
    }
    /**
    * Creates phrases for use in game
    * @return {array} An array of phrases that could be used in the game
    */
    createPhrases() {
        return [new Phrase('John Wick'),
                new Phrase('Moonrise Kingdom'),
                new Phrase('Joker'),
                new Phrase('The Dark Knight'),
                new Phrase('The Babadook')];
    };

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        return this.phrases[Math.round(Math.random()*4)];
    };
    
    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        document.getElementById('overlay').style.display = 'none';
        this.activePhrase.addPhraseToDisplay();
    };

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't won
    */
    checkForWin() {
        const hiddenLetters = document.getElementsByClassName('hide');
        const tries = document.getElementsByClassName('tries');
        if(hiddenLetters.length === 0 && tries.length > 0){
            return true
        }
        return false;
    };

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        const imgs = document.getElementsByClassName('tries');
        imgs[this.missed].innerHTML = "<img src='images/lostHeart.png' alt='Lost Heart Icon' height='35' width='30'></img>"
        this.missed += 1;
        if(this.missed === 5){
            this.gameOver(false);
        }
    };

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
        const h1 = document.getElementsByTagName('h1')[0];
        if(gameWon){
            h1.textContent = "Great Job!"
            overlay.classList.replace('start', 'win');   //potential probem 2
        } else {
            h1.textContent = "Sorry, better luck next time!"
            overlay.classList.replace('start', 'lose');
        }
    };

    handleInteraction(button) {
        //The clicked/chosen letter must be captured.
        //The clicked letter must be checked against the phrase for a match.
        const keyboard = document.getElementById('qwerty');
        keyboard.addEventListener('click', (e)=>{
            //If there’s a match, the letter must be displayed on screen instead of the placeholder.
            //If there’s no match, the game must remove a life from the scoreboard.
            if(this.activePhrase.checkLetter(e.target.innerHTML)){
                this.activePhrase.showMatchedLetter(e.target.innerHTML);
            } else {
                this.removeLife();
            }
        });
        // problem 1
        //The game should check if the player has won the game by revealing all of the letters in
        //the phrase or if the game is lost because the player is out of lives.
        //If the game is won or lost, a message should be displayed on screen.
        if(this.checkForWin()){
            this.gameOver(true);
        } else if (this.missed == 5){
            this.gameOver(false);
        }
        
    }


}