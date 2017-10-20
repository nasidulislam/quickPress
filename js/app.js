var lightSwitch, settings;

settings = {
    lightsSliderClass: '.game-lights__switch-slider'
}

// buttons
lightSwitch = document.querySelector(settings.lightsSliderClass);

/* Begin Function Declarations */

function toggleLight(event) {
    console.log(event);
}

/* End Function Declarations */

/* Begin Event Listeners */

lightSwitch.addEventListener('click', toggleLight);

/* End Event Listeners */
