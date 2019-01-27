define(function (require) {
	var settings = {
		// selectors
		gameControlsContainerClass: '.game-controls__container',
		svgCircleClass: '.game-circle',
		form: '.form',
		username: '.username',
		password: '.password',

		// buttons
		resetButton: '.reset-button.js-button',
		lightsSlider: '.game-buttons__lights-slider',
		loginButton: '.rules-modal__login-container .login-button.js-button',
		signupButton: '.rules-modal__signup-container .signup-button.js-button',
		timeoutModalButton: '.timeout-modal__content-button-container .timeout-modal__button',
		endgameModalButton: '.endgame-modal__content-button-container .endgame-modal__button.js-button',

		// classes
		gameStart: 'game-start'
	};

	// buttons
	var $lightSwitch = document.querySelector(settings.lightsSlider);
	var $resetButton = document.querySelector(settings.resetButton);
	var $timeoutModalButton = document.querySelector(settings.timeoutModalButton);
	var $endgameModalButton = document.querySelector(settings.endgameModalButton);

	// Elements
	$gameControls = document.querySelector(settings.gameControlsContainerClass);
	$svgCircle = document.querySelector(settings.svgCircleClass);
	$forms = document.querySelectorAll(settings.form);

	// modules
	var placement = require('modules/placement');
	var frequency = require('modules/frequency');
	var score = require('modules/score');
	var util = require('modules/util');
	var remainingTries = require('modules/remainingTries');
	var modals = require('modules/modals');
	var helpers = require('modules/helpers');
	var auth = require('modules/authentication');

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

	function handleFormSubmit(event) {
		event.preventDefault();

		var form = event.target;
		var $username = form.querySelector(settings.username);
		var $password = form.querySelector(settings.password);

		var username = helpers.toTitleCase($username.value);
		var password = $password.value;

		if(helpers.validateCreds(form, $username, username, $password, password)) {
			auth.handleAuth(form, username, password);
		}
	}

	/* End Function Declarations */

	/* Begin Event Listeners */

	handleReload();
	// click handlers
	$lightSwitch.addEventListener('click', util.toggleLight);
	$resetButton.addEventListener('click', util.reset);
	$svgCircle.addEventListener('click', theGame);
	$timeoutModalButton.addEventListener('click', modals.closeTimeoutModal);
	$endgameModalButton.addEventListener('click', modals.closeEndgameModal);


	// custom event handlers
	document.body.addEventListener('quickPress: increase-animate', remainingTries.increaseScoreAndAnimate);
	document.body.addEventListener('quickPress: end-game', util.endGame);
	document.body.addEventListener('quickPress: reset', util.reset);

	// other handlers
	$forms.forEach(function(form) {
		form.addEventListener('submit', handleFormSubmit);
	});

	/* End Event Listeners */

});
