/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor(){
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
        this.gameStarted = false;
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
        this.reset();
        this.gameStarted = true;
        document.getElementById('overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
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
    //reset the board after game finished
    reset(){
        this.missed = 0;
        document.getElementById('phrase').children[0].innerHTML = '';
        const keyrows = document.getElementsByClassName('keyrow');
        //const keys = document.getElementsByClassName('key');
        for(let i = 0; i < keyrows.length; i++){
            for(let j = 0; j < keyrows[i].children.length; j++){
                keyrows[i].children[j].disabled = false;
                keyrows[i].children[j].className = "key";
        }}
        const tries = document.getElementsByClassName('tries');
        for(let i = 0; i < tries.length; i++){
            tries[i].innerHTML = "<img src='images/liveHeart.png' alt='Lost Heart Icon' height='35' width='30'></img>"
        }
        document.getElementById('overlay').className = "start";
       
    }
    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
        const h1 = document.getElementsByTagName('h1')[0];
        this.gameStarted = false;  
        if(gameWon){
            h1.textContent = "Great Job!"
            overlay.classList.replace('start', 'win');   
        } else {
            h1.textContent = "Sorry, better luck next time!"
            overlay.classList.replace('start', 'lose');
        }
    };

    handleInteraction(button) {
        //Disable the selected letter’s onscreen keyboard button.
        if (button.disabled){
            return;
        };
        button.disabled = true;
        if(this.activePhrase.checkLetter(button.innerHTML)){
            this.activePhrase.showMatchedLetter(button.innerHTML);
            button.classList.add('chosen');
            if(this.checkForWin()){
                this.gameOver(true);
            };
        } else {
            button.classList.add('wrong');
            this.removeLife();
        }
    }

}