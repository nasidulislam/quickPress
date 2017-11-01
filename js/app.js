var $lightSwitch, settings, $gameControls, $svgCircle;

settings = {
	// selectors
	gameControlsContainerClass: '.game-controls__container',
	lightsSliderClass: '.game-buttons__lights-slider',
	scoreCardClass: '.game-circle__scorecard',
	svgCircleClass: '.game-circle',

	// buttons
	resetButtonClass: '.game-buttons__reset',
	primaryContentClass: '.primary-content',
	bodyClass: '.body-class',

	// classes
	gameStart: 'game-start',
	lightsToggle: 'toggle-lights',

	// others
	builtTimingArray: []
};

// buttons
$lightSwitch = document.querySelector(settings.lightsSliderClass);
$resetButton = document.querySelector(settings.resetButtonClass);

// Elements
$gameControls = document.querySelector(settings.gameControlsContainerClass);
$scoreCard = document.querySelector(settings.scoreCardClass);
$primaryContent = document.querySelector(settings.primaryContentClass);
$body = document.querySelector(settings.bodyClass);
$svgCircle = document.querySelector(settings.svgCircleClass);

/* Begin Function Declarations */

function theGame () {
	$gameControls.classList.add(settings.gameStart);
	handleScoring();
}

function handleScoring () {
	var currentScore, newScore;

	currentScore = getCurrentScore();
	newScore = currentScore + 1;
	setScore(newScore);
}

function handleReset () {
	setScore(0);
	$gameControls.classList.remove(settings.gameStart);
}

function handleReload() {
	handleReset();
}

function toggleLight () {
	$body.classList.toggle(settings.lightsToggle);
}

function getCurrentScore () {
	var currentScore;

	currentScore = parseInt($scoreCard.innerHTML);
	settings.currentScore = currentScore;
	return currentScore;
}

function setScore (score) {
	$scoreCard.innerHTML = score;
}

/* End Function Declarations */

/* Begin Event Listeners */

document.addEventListener('DOMContentLoaded', handleReload);
$lightSwitch.addEventListener('click', toggleLight);
$resetButton.addEventListener('click', handleReset);
$svgCircle.addEventListener('click', theGame);

/* End Event Listeners */
