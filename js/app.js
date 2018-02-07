define(function (require) {
	var settings,
		$resetButton, $lightSwitch, $gameControls, $svgCircle;

	settings = {
		// selectors
		gameControlsContainerClass: '.game-controls__container',
		lightsSliderClass: '.game-buttons__lights-slider',
		svgCircleClass: '.game-circle',

		// buttons
		resetButtonClass: '.game-buttons__reset',

		// classes
		gameStart: 'game-start'
	};

	// buttons
	$lightSwitch = document.querySelector(settings.lightsSliderClass);
	$resetButton = document.querySelector(settings.resetButtonClass);

	// Elements
	$gameControls = document.querySelector(settings.gameControlsContainerClass);
	$svgCircle = document.querySelector(settings.svgCircleClass);

	// modules
	var placement = require('modules/placement');
	var frequency = require('modules/frequency');
	var score = require('modules/score');
	var util = require('modules/util');
	var remainingTries = require('modules/remainingTries');

	/* Begin Function Declarations */

	function theGame() {
		$gameControls.classList.add(settings.gameStart);

		if (score.isValidScore()) {
			score.handleScoring();
			frequency.handlePointFrequency();
			placement.handlePuntPlacement();
			remainingTries.removeHighlight();
		} else {
			remainingTries.handleRemainingTries();
		}
	}

	function handleReload() {
		util.handleReset();
		util.getCurrentLocation();
	}

	/* End Function Declarations */

	/* Begin Event Listeners */

	handleReload();
	$lightSwitch.addEventListener('click', util.toggleLight);
	$resetButton.addEventListener('click', util.handleReset);
	$svgCircle.addEventListener('click', theGame);
	document.body.addEventListener('quickPress: increase-animate', remainingTries.increaseScoreAndAnimate);

	/* End Event Listeners */

});
