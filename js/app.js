var lightSwitch, settings, gameButton;

settings = {
    gameButtonClass: '.game-circle',
    lightsSliderClass: '.game-lights__switch-slider'
}

// buttons
lightSwitch = document.querySelector(settings.lightsSliderClass);
gameButton = document.querySelector(settings.gameButtonClass);

/* Begin Function Declarations */

function theGame(event) {
    console.log('game');
}

function toggleLight(event) {
    console.log('toggle light');
}

/* End Function Declarations */

/* Begin Event Listeners */

lightSwitch.addEventListener('click', toggleLight);
gameButton.addEventListener('click', theGame);

/* End Event Listeners */
