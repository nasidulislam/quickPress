define(function (require) {
	var settings,
		$resetButton, $lightSwitch, $gameControls, $svgCircle, $rulesModalButton;

	settings = {
		// selectors
		gameControlsContainerClass: '.game-controls__container',
		svgCircleClass: '.game-circle',

		// buttons
		resetButton: '.game-buttons__reset',
		lightsSlider: '.game-buttons__lights-slider',
		rulesModalButton: '.rules-modal__content-button-container .rules-modal__button',

		// classes
		gameStart: 'game-start'
	};

	// buttons
	$lightSwitch = document.querySelector(settings.lightsSlider);
	$resetButton = document.querySelector(settings.resetButton);
	$rulesModalButton = document.querySelector(settings.rulesModalButton);

	// Elements
	$gameControls = document.querySelector(settings.gameControlsContainerClass);
	$svgCircle = document.querySelector(settings.svgCircleClass);

	// modules
	var placement = require('modules/placement');
	var frequency = require('modules/frequency');
	var score = require('modules/score');
	var util = require('modules/util');
	var remainingTries = require('modules/remainingTries');
	var modals = require('modules/modals');

	/* Begin Function Declarations */

	function theGame() {
		$gameControls.classList.add(settings.gameStart);
		util.handleUserTimeout();

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
	$rulesModalButton.addEventListener('click', modals.closeRulesModal);
	document.body.addEventListener('quickPress: increase-animate', remainingTries.increaseScoreAndAnimate);

	/* End Event Listeners */

});
