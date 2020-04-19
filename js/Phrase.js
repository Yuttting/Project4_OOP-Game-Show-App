/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }
    //adds letter placeholders to the display when the game starts. 
    //Each letter is presented by an empty box, one li element for each letter.
    addPhraseToDisplay(){
        const div = document.getElementById('phrase');
        for(let i = 0; i < this.phrase.length; i++){
            const letter = this.phrase.charAt(i);
            //console.log(letter);
            const li = document.createElement('li');
            li.textContent = letter;
            if(li.textContent === ' '){
                li.className = 'space';
            } else {
                li.className = `hide letter ${letter}`;
            }
            div.children[0].appendChild(li);
        }
        //console.log(div);
        
    }

    //checks to see if the letter selected by the player matches a letter in the phrase.
    checkLetter(letter) {
        const letters = document.getElementsByClassName('letter');
        for(let i = 0; i< letters.length; i++){
            if(letters[i].innerHTML === letter){
                return true
            }
        }
        return false;
    }

    //reveals the letter(s) on the board that matches the player's selection.
    showMatchedLetter(letter) {
        if(this.checkLetter(letter)){
            const matchedLetters = document.getElementsByClassName(letter);
            for(let i =0; i< matchedLetters.length; i++){
                matchedLetters[i].classList.remove('hide');
                matchedLetters[i].classList.add('show');
            }
        }
    }
}