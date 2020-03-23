/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;
//add event listeners for the start button 
document.getElementById('btn__reset').addEventListener('click', function(){
    game = new Game();
    game.startGame();
});

//add event listeners for the onscreen keyboard buttons
document.getElementById('qwerty').addEventListener('click', function(){
    game.handleInteraction();
});

//test


