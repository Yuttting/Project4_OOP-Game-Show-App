/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game = new Game();
//add event listeners for the start button 
document.getElementById('btn__reset').addEventListener('click', function(){ 
    game.startGame();
});


//add event listeners for the onscreen keyboard buttons
const keys = document.getElementsByClassName('key');
for(let i =0; i<keys.length; i++){
    keys[i].addEventListener('click', function(e){;
        game.handleInteraction(e.target);
    })
};


addEventListener('keyup', function(e){
    if(game.gameStarted){
        for(let i =0; i<keys.length; i++){
            if(e.key === keys[i].innerHTML){
                keys[i].focus();
                game.handleInteraction(keys[i]);
                return;
            }
        };
    } else {
        //console.log(e.key);
        if(e.key === ' ' || e.key === 'Enter'){
            game.startGame();
        }
    }
    
})



