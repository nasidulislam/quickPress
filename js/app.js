define(function(require) {
	var settings,
	$resetButton, $lightSwitch,
	$gameControls, $svgCircle, $scoreCard, $svgElement, $remainingTriesScore,
	$point, $pointSvg, $puntSvg,
	$finalScore, $remainingTriesElement;

	settings = {
	// selectors
	gameControlsContainerClass: '.game-controls__container',
	remainingTriesContainerClass: '.game-score__remaining-tries',
	lightsSliderClass: '.game-buttons__lights-slider',
	scoreCardClass: '.game-circle__scorecard',
	svgCircleClass: '.game-circle',
	circlePoint: '.point',
	circlePunt: '.punt',
	finalScoreClass: '.game-score__final',
	remainingTriesScoreClass: '.game-score__life',

	// buttons
	resetButtonClass: '.game-buttons__reset',
	primaryContentClass: '.primary-content',

	// classes
	gameStart: 'game-start',
	lightsToggle: 'toggle-lights',
	vibrateClass: 'vibrate-class',
	redColorClass: 'color-class-red',

	// others
	errorMargin: 50
};

	// buttons
	$lightSwitch = document.querySelector(settings.lightsSliderClass);
	$resetButton = document.querySelector(settings.resetButtonClass);

	// Elements
	$gameControls = document.querySelector(settings.gameControlsContainerClass);
	$scoreCard = document.querySelector(settings.scoreCardClass);
	$svgCircle = document.querySelector(settings.svgCircleClass);
	$point = document.querySelector(settings.circlePoint);
	$svgElement = document.getElementsByTagName('svg')[0];
	$pointSvg = $svgElement.querySelectorAll('circle')[0];
	$puntSvg = $svgElement.querySelectorAll('circle')[1];
	$remainingTriesScore = document.querySelector(settings.remainingTriesScoreClass);
	$finalScore = document.querySelector(settings.finalScoreClass);
	$remainingTriesElement = document.querySelector(settings.remainingTriesContainerClass);

	// modules
	var placement = require('modules/placement');
	var frequency = require('modules/frequency');
	var score = require('modules/score');
	var toggleLight = require('modules/toggleLight');
	var location = require('modules/location');

	/* Begin Function Declarations */

	function theGame () {
		$gameControls.classList.add(settings.gameStart);

		// if user scores correctly, then increment score, increase point frequency and place punt somewhere
		if(isValidScore()) {
			$svgElement.unpauseAnimations();
			score.handleScoring();
			placement.handlePointFrequency($point);
			placement.handlePuntPlacement();
		} else {
			handleInvalidScore();
		}
	}

	function handleInvalidScore () {
		handleRemainingTries();
	}

	function handleReset () {
		// pause all svg animation on reset and set initial position to 0
		$svgElement.pauseAnimations();
		$svgElement.setCurrentTime(0);
		frequency.setRotationFrequency($point, '');

		// reset all scores
		score.setScore($scoreCard, 0);
		score.setScore($remainingTriesScore, 3);

		// remove classes and html added
		$gameControls.classList.remove(settings.gameStart);
		$finalScore.textContent = '';
		$remainingTriesElement.classList.remove(settings.redColorClass);
	}

	function handleReload() {
		handleReset();
		location.getCurrentLocation();
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

	function handleRemainingTries () {
		var newRemainingTries, customEvent;

		// decrease score
		newRemainingTries = score.getCurrentScore($remainingTriesScore) - 1;
		score.setScore($remainingTriesScore, newRemainingTries);

		// dispatch custom event that handles animation on wrong hits
		customEvent = new Event('quickPress: wrong-hit');
		$remainingTriesScore.dispatchEvent(customEvent);

		// make remaining tries section red when user has 0 tries left
		if(score.getCurrentScore($remainingTriesScore) === 0) {
			$remainingTriesElement.classList.add(settings.redColorClass);
		}

		// handles end game functionality --> should probably make its own function
		if(score.getCurrentScore($remainingTriesScore) < 0) {
			alert('game over');
	        score.setScore($remainingTriesScore, 0);
	        $finalScore.innerHTML = 'Your Final Score: <span class="final-score">' + score.getCurrentScore($scoreCard) + '</span>';
			$svgElement.pauseAnimations();
		}
	}

	function handleRemainingTriesAnimation() {
		$remainingTriesElement.classList.add(settings.vibrateClass);
		$remainingTriesElement.addEventListener('animationend', function () {
			$remainingTriesElement.classList.remove(settings.vibrateClass);
		});
	}

	/* End Function Declarations */

	/* Begin Event Listeners */

	handleReload();
	$lightSwitch.addEventListener('click', toggleLight.toggleLight);
	$resetButton.addEventListener('click', handleReset);
	$svgCircle.addEventListener('click', theGame);
	$remainingTriesScore.addEventListener('quickPress: wrong-hit', handleRemainingTriesAnimation);

	/* End Event Listeners */

});
