var settings,
	$resetButton, $lightSwitch,
	$gameControls, $svgCircle, $scoreCard, $primaryContent, $body,
	$point;

settings = {
	// selectors
	gameControlsContainerClass: '.game-controls__container',
	lightsSliderClass: '.game-buttons__lights-slider',
	scoreCardClass: '.game-circle__scorecard',
	svgCircleClass: '.game-circle',
	circlePoint: '.point',
	circlePunt: '.punt',

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
$point = document.querySelector(settings.circlePoint);

/* Begin Function Declarations */

function theGame () {
	$gameControls.classList.add(settings.gameStart);
	handleScoring();
}

function handleScoring () {
	var currentScore, newScore, currentDuration;

	// increment score
	currentScore = getCurrentScore();
	newScore = currentScore + 1;
	setScore(newScore);

	// increment frequency
	currentDuration = getRotationFrequency();

	// bypass initial large number set to simulate stationary point
	if(currentDuration === 10000000) {
		currentDuration = 8
	}

	setRotationFrequency(currentDuration / 2);
}

function handleReset () {
	setScore(0);
	$gameControls.classList.remove(settings.gameStart);
	setRotationFrequency(10000000);
}

function handleReload() {
	handleReset();
}

function toggleLight () {
	$body.classList.toggle(settings.lightsToggle);

	// swap color palette for scorecard
	switch ($scoreCard.attributes.fill.value) {
		case 'white':
			$scoreCard.attributes.fill.value = 'blue';
			break;
		case 'blue':
			$scoreCard.attributes.fill.value = 'white';
			break;
	}
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

function getRotationFrequency() {
	var attrs, freq, freqNumber;

	attrs = $point.attributes;
	freq = attrs.dur.value;
	freqNumber = parseFloat(freq.substr(0, freq.length - 1));

	return freqNumber;
}


function setRotationFrequency(freq) {
	var attrs;

	attrs = $point.attributes;
	attrs.dur.value = freq + 's';
}

/* End Function Declarations */

/* Begin Event Listeners */

document.addEventListener('DOMContentLoaded', handleReload);
$lightSwitch.addEventListener('click', toggleLight);
$resetButton.addEventListener('click', handleReset);
$svgCircle.addEventListener('click', theGame);

/* End Event Listeners */
