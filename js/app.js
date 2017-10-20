var lightSwitch;

lightSwitch = document.querySelector('.game-lights__switch-slider');

/* Begin Function Declarations */

function toggleLight(event) {
    console.log(event);
}

/* End Function Declarations */

/* Begin Event Listeners */

lightSwitch.addEventListener('click', toggleLight);

/* End Event Listeners */
