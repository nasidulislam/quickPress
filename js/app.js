var $lightSwitch, settings, $gameButton, $gameControls;

settings = {
    gameButtonClass: '.game-circle',
    gameControlsContainerClass: '.game-controls__container',
    lightsSliderClass: '.game-lights__switch-slider',
    circlePoint: '.point',
    builtTimingArray: []
}

// buttons
$lightSwitch = document.querySelector(settings.lightsSliderClass);
$gameButton = document.querySelector(settings.gameButtonClass);

// Elements
$gameControls = document.querySelector(settings.gameControlsContainerClass);
$point = document.querySelector(settings.circlePoint);

/* Begin Function Declarations */

function theGame(event) {
    $gameControls.classList.add('game-start');
    handleLoopDecrement();
}

function handleLoopDecrement() {
    $point.style.cssText = 'animation-duration: ' + settings.builtTimingArray.pop() + 's';
}

function buildTimingArray() {
    var animationTiming, initial, i, builtArray;

    animationTiming = [5, 4, 3, 2];
    animationTiming = [5, 4.5, 4, 3.5, 3, 2.5, 2];
    builtArray = [];

    for(i = 0; i < 50; i++) {
        initial = animationTiming[animationTiming.length - 1];
        animationTiming.push(initial/1.2);
    }

    settings.builtTimingArray = animationTiming.reverse();
}

function toggleLight(event) {
    console.log('toggle light');
}

/* End Function Declarations */

/* Begin Event Listeners */

document.addEventListener('DOMContentLoaded', buildTimingArray);
$lightSwitch.addEventListener('click', toggleLight);
$gameButton.addEventListener('click', theGame);

/* End Event Listeners */
