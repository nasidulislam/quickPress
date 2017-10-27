var $lightSwitch, settings, $gameButton, $gameControls;

settings = {
	gameButtonClass: '.game-circle',
	gameControlsContainerClass: '.game-controls__container',
	lightsSliderClass: '.game-buttons__lights-slider',
	circlePoint: '.point',
	scoreCardClass: '.game-circle__scorecard',
	builtTimingArray: [],
	resetButtonClass: '.game-buttons__reset',
	primaryContentClass: '.primary-content',
	gameStart: 'game-start',
	lightsToggle: 'toggle-lights'
};

// buttons
$lightSwitch = document.querySelector(settings.lightsSliderClass);
$gameButton = document.querySelector(settings.gameButtonClass);
$resetButton = document.querySelector(settings.resetButtonClass);

// Elements
$gameControls = document.querySelector(settings.gameControlsContainerClass);
$point = document.querySelector(settings.circlePoint);
$scoreCard = document.querySelector(settings.scoreCardClass);
$primaryContent = document.querySelector(settings.primaryContentClass);

/* Begin Function Declarations */

function theGame() {
	$gameControls.classList.add(settings.gameStart);
	handleLoopDecrement();
	handleScoring();
}

function handleLoopDecrement() {
	$point.style.cssText = 'animation-duration: ' + settings.builtTimingArray.pop() + 's';
}

function handleScoring() {
	var currentScore, newScore;

	currentScore = getCurrentScore();
	newScore = currentScore + 1;
	setScore(newScore);
}

function handleReset() {
	setScore(0);
	buildTimingArray();
	$gameControls.classList.remove(settings.gameStart);
}

function buildTimingArray() {
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

function toggleLight() {
	$primaryContent.classList.toggle(settings.lightsToggle);
}

function getCurrentScore() {
	var currentScore;

	currentScore = parseInt($scoreCard.innerHTML);
	settings.currentScore = currentScore;
	return currentScore;
}

function setScore(score) {
	$scoreCard.innerHTML = score;
}

/* End Function Declarations */

/* Begin Event Listeners */

document.addEventListener('DOMContentLoaded', handleReload);
$lightSwitch.addEventListener('click', toggleLight);
$gameButton.addEventListener('click', theGame);
$resetButton.addEventListener('click', handleReset);

/* End Event Listeners */
