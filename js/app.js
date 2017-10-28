var $lightSwitch, settings, $gameButton, $gameControls;

settings = {
	// selectors
	gameButtonClass: '.game-circle',
	gameControlsContainerClass: '.game-controls__container',
	lightsSliderClass: '.game-buttons__lights-slider',
	scoreCardClass: '.game-circle__scorecard',
	circlePoint: '.point',
	circlePunt: '.punt',

	// buttons
	resetButtonClass: '.game-buttons__reset',
	primaryContentClass: '.primary-content',
	bodyClass: '.body-class',

	// classes
	gameStart: 'game-start',
	lightsToggle: 'toggle-lights',
	animatePunt: 'animate-punt',

	// others
	builtTimingArray: []
};

// buttons
$lightSwitch = document.querySelector(settings.lightsSliderClass);
$gameButton = document.querySelector(settings.gameButtonClass);
$resetButton = document.querySelector(settings.resetButtonClass);

// Elements
$gameControls = document.querySelector(settings.gameControlsContainerClass);
$point = document.querySelector(settings.circlePoint);
$punt = document.querySelector(settings.circlePunt);
$scoreCard = document.querySelector(settings.scoreCardClass);
$primaryContent = document.querySelector(settings.primaryContentClass);
$body = document.querySelector(settings.bodyClass);

/* Begin Function Declarations */

function theGame () {
	$gameControls.classList.add(settings.gameStart);
	handleLoopDecrement();
	handleScoring();
	handlePuntPlacement();
}

function handleLoopDecrement () {
	$point.style.cssText = 'animation-duration: ' + settings.builtTimingArray.pop() + 's';
}

function handleScoring () {
	var currentScore, newScore;

	currentScore = getCurrentScore();
	newScore = currentScore + 1;
	setScore(newScore);
}

function handleReset () {
	setScore(0);
	buildTimingArray();
	$gameControls.classList.remove(settings.gameStart);
}

function buildTimingArray () {
	var animationTiming, initial, i;

	animationTiming = [5, 4.5, 4, 3.5, 3, 2.5, 2];

	for (i = 0; i < 50; i++) {
		initial = animationTiming[animationTiming.length - 1];
		animationTiming.push(initial / 1.2);
	}

	settings.builtTimingArray = animationTiming.reverse();
}

function handleReload() {
	buildTimingArray();
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

function handlePuntPlacement () {
	$punt.style.cssText = 'animation-play-state: running';
	setTimeout(function() {
		$punt.style.cssText = 'animation-play-state: paused';
	}, 25);
	getCurrentAngle();
}

function getCurrentAngle () {
	var style, transformMatrix;

	style = window.getComputedStyle($point, null);
	transformMatrix = style.getPropertyValue('transform');
	console.log(transformMatrix);
}
/* End Function Declarations */

/* Begin Event Listeners */

document.addEventListener('DOMContentLoaded', handleReload);
$lightSwitch.addEventListener('click', toggleLight);
$gameButton.addEventListener('click', theGame);
$resetButton.addEventListener('click', handleReset);

/* End Event Listeners */
