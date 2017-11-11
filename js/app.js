var settings,
	$resetButton, $lightSwitch,
	$gameControls, $svgCircle, $scoreCard, $primaryContent, $body, $svgElement, $remainingTriesScore,
	$point, $punt, $pointSvg, $puntSvg, $puntAnimationElement,
	$finalScore;

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
	errorMargin: 50,
	rangeMin: 0.000025,
	rangeMax: 0.000075,
	currentScore: ''
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
$puntAnimationElement = $puntSvg.querySelector('animateMotion');
$remainingTriesScore = document.querySelector('.game-score__life');
$finalScore = document.querySelector('.game-score__final');

/* Begin Function Declarations */

function theGame () {
	$gameControls.classList.add(settings.gameStart);

	// if user scores correctly, then increment score, increase point frequency and place punt somewhere
	if(isValidScore()) {
		$svgElement.unpauseAnimations();
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
		currentDuration = 20;
	}

	setRotationFrequency($point, currentDuration / 2); //TODO : write a difficulty implementation function
}

function handlePuntPlacement() {
	var randomPlacementVariable = parseFloat((getRandomFloat(settings.rangeMin, settings.rangeMax)).toFixed(6)) * Math.pow(10, 4);

	setTimeout(function () {
		$puntAnimationElement.setAttribute('repeatCount', '' + randomPlacementVariable);
		// have to reset current time to 0 every time to keep punt in place
		$svgElement.setCurrentTime(0);
	}, randomPlacementVariable);
}

function handleScoring () {
	var currentScore, newScore;

	currentScore = getCurrentScore($scoreCard);
	newScore = currentScore + 1;
	settings.currentScore = newScore;
	setScore($scoreCard, newScore);
}

function handleInvalidScore () {
	handleRemainingTries();
}

function handleReset () {
	// pause all svg animation on reset and set initial position to 0
	$svgElement.pauseAnimations();
	$svgElement.setCurrentTime(0);
	setRotationFrequency($point, '');

	// reset all scores
	setScore($scoreCard, 0);
	setScore($remainingTriesScore, 3);

	// remove classes and html added
	$gameControls.classList.remove(settings.gameStart);
	$finalScore.textContent = '';
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

function getCurrentScore (el) {
	var currentScore;

	currentScore = parseInt(el.innerHTML);
	return currentScore;
}

function setScore (el, score) {
	el.innerHTML = score;
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

function isValidScore() {
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
		marginY: currentPointLocation.pointY - currentPuntLocation.puntY
	};

	return (Math.abs(errorMargin.marginX) <= settings.errorMargin && (Math.abs(errorMargin.marginY) <= settings.errorMargin));
}

function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function handleRemainingTries () {
	var newRemainingTries;

	newRemainingTries = getCurrentScore($remainingTriesScore) - 1;
	setScore($remainingTriesScore, newRemainingTries);

	if(getCurrentScore($remainingTriesScore) < 0) {
		alert('game over');
        setScore($remainingTriesScore, 0);
        $finalScore.innerHTML = 'Your Final Score: <span class="final-score">' + settings.currentScore + '</span>';
		$svgElement.pauseAnimations();
	}
}

/* End Function Declarations */

/* Begin Event Listeners */

document.addEventListener('DOMContentLoaded', handleReload);
$lightSwitch.addEventListener('click', toggleLight);
$resetButton.addEventListener('click', handleReset);
$svgCircle.addEventListener('click', theGame);

/* End Event Listeners */
