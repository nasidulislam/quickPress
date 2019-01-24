define(function (require) {
	var settings,
		$resetButton, $lightSwitch, $gameControls, $svgCircle,
		$rulesModalButton, $timeoutModalButton, $endgameModalButton;

	settings = {
		// selectors
		gameControlsContainerClass: '.game-controls__container',
		svgCircleClass: '.game-circle',
		usernameInputId: '#username',
		passwordInputId: '#password',

		// buttons
		resetButton: '.game-buttons__reset',
		lightsSlider: '.game-buttons__lights-slider',
		rulesModalButton: '.rules-modal__content-button-container .rules-modal__button',
		timeoutModalButton: '.timeout-modal__content-button-container .timeout-modal__button',
		endgameModalButton: '.endgame-modal__content-button-container .endgame-modal__button',

		// classes
		gameStart: 'game-start'
	};

	// buttons
	$lightSwitch = document.querySelector(settings.lightsSlider);
	$resetButton = document.querySelector(settings.resetButton);
	$rulesModalButton = document.querySelector(settings.rulesModalButton);
	$timeoutModalButton = document.querySelector(settings.timeoutModalButton);
	$endgameModalButton = document.querySelector(settings.endgameModalButton);

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
	var helpers = require('modules/helpers');
	var login = require('modules/login');

	/* Begin Function Declarations */

	function theGame() {
		$gameControls.classList.add(settings.gameStart);

		/* Switching Off user Timeout Issues */
		// util.handleUserTimeout();

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
		util.reset();
		util.getCurrentLocation();
	}

	function validateCreds() {
		var $username = document.querySelector(settings.usernameInputId);
		var $password = document.querySelector(settings.passwordInputId);
		var username = helpers.toTitleCase($username.value);
		var password = $password.value;

		// if either username and/or password is not provided, throw error and return
		if((username === "") && (password === "")) {
			$username.classList.add('error');
			$password.classList.add('error');
			return
		} else if(password === "") {
			$password.classList.add('error');
			$username.classList.remove('error');
			return;
		} else if(username === "") {
			$username.classList.add('error');
			$password.classList.remove('error');
			return;
		}

		// when we have valid creds, run login and close modal
		login.runLogin(username, password);
		modals.closeRulesModal();
	}

	/* End Function Declarations */

	/* Begin Event Listeners */

	handleReload();
	// click handlers
	$lightSwitch.addEventListener('click', util.toggleLight);
	$resetButton.addEventListener('click', util.reset);
	$svgCircle.addEventListener('click', theGame);
	$rulesModalButton.addEventListener('click', validateCreds);
	$timeoutModalButton.addEventListener('click', modals.closeTimeoutModal);
	$endgameModalButton.addEventListener('click', modals.closeEndgameModal);

	// custom event handlers
	document.body.addEventListener('quickPress: increase-animate', remainingTries.increaseScoreAndAnimate);
	document.body.addEventListener('quickPress: end-game', util.endGame);
	document.body.addEventListener('quickPress: reset', util.reset);

	/* End Event Listeners */

});
