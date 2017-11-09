var settings,
	$resetButton, $lightSwitch,
	$gameControls, $svgCircle, $scoreCard, $primaryContent, $body, $svgElement,
	$point, $punt, $pointSvg, $puntSvg;

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
	stationaryFreq: 10000000,
	errorMargin: '50'
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
$svgElement = document.getElementsByTagName('svg')[0];
$pointSvg = $svgElement.querySelectorAll('circle')[0];
$puntSvg = $svgElement.querySelectorAll('circle')[1];

/* Begin Function Declarations */

function theGame () {
	$gameControls.classList.add(settings.gameStart);

	// if user scores correctly, then increment score, increase point frequency and place punt somewhere
	if(isValidSCore()) {
		handleScoring();
		handlePointFrequency();
		handlePuntPlacement();
	} else {
		handleInvalidScore();
	}
}

function handlePointFrequency() {
	var currentDuration;

	currentDuration = getRotationFrequency($point);

	// bypass initial duration value being set to nothing on svg element
	if(isNaN(currentDuration)) {
		currentDuration = 100;
	}

	setRotationFrequency($point, currentDuration / 2); //TODO : write a difficulty implementation function
	$svgElement.unpauseAnimations();
}

function handlePuntPlacement() {
	console.log('punt placement');
}

function handleScoring () {
	var currentScore, newScore;

	currentScore = getCurrentScore();
	newScore = currentScore + 1;
	setScore(newScore);
}

function handleInvalidScore () {
	console.log('wrong');
}

function handleReset () {
	// pause all svg animation on reset and set initial position to 0
	$svgElement.pauseAnimations();
	$svgElement.setCurrentTime(0);
	setRotationFrequency($point, '');

	setScore(0);
	$gameControls.classList.remove(settings.gameStart);
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

function isValidSCore() {
	var currentPointLocation, currentPuntLocation, errorMargin;

	currentPointLocation = {
		pointX: $pointSvg.getScreenCTM().e,
		pointY: $pointSvg.getScreenCTM().f
	};

	currentPuntLocation = {
		puntX: $puntSvg.getScreenCTM().e,
		puntY: $puntSvg.getScreenCTM().f
	};

	errorMargin = {
		marginX: currentPointLocation.pointX - currentPuntLocation.puntX,
		marginY: currentPointLocation.pointY - currentPuntLocation.puntX
	};

	return (Math.abs(errorMargin.marginX) <= settings.errorMargin && (Math.abs(errorMargin.marginY) <= settings.errorMargin));
}

/* End Function Declarations */

/* Begin Event Listeners */

document.addEventListener('DOMContentLoaded', handleReload);
$lightSwitch.addEventListener('click', toggleLight);
$resetButton.addEventListener('click', handleReset);
$svgCircle.addEventListener('click', theGame);

/* End Event Listeners */
