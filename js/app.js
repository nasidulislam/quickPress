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
	stationaryFreq: 10000000
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
$punt = document.querySelector(settings.circlePunt);

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

	// increment frequency of point
	currentDuration = getRotationFrequency($point);

	// bypass initial large number set to simulate stationary point
	if(currentDuration === settings.stationaryFreq) {
		currentDuration = 8;
	}

	setRotationFrequency($point, currentDuration / 2); //TODO : write a difficulty implementation function

	handlePuntPlacement();
}

function handleReset () {
	setScore(0);
	$gameControls.classList.remove(settings.gameStart);

	// set large rotation frequency to simluate stationary point
	setRotationFrequency($point, settings.stationaryFreq);
	setRotationFrequency($punt, settings.stationaryFreq);
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

function getRotationFrequency(el) {
	var attrs, freq, freqNumber;

	attrs = el.attributes;
	freq = attrs.dur.value;
	freqNumber = parseFloat(freq.substr(0, freq.length - 1));

	return freqNumber;
}


function setRotationFrequency(el, freq) {
	var attrs;

	attrs = el.attributes;
	attrs.dur.value = freq + 's';
}

function handlePuntPlacement() {
	console.log('punt placement');
}

/* End Function Declarations */

/* Begin Event Listeners */

document.addEventListener('DOMContentLoaded', handleReload);
$lightSwitch.addEventListener('click', toggleLight);
$resetButton.addEventListener('click', handleReset);
$svgCircle.addEventListener('click', theGame);

/* End Event Listeners */
