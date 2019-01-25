define(function (require) {

	// modules
	var frequency = require('modules/frequency');
	var score = require('modules/score');
	var modals = require('modules/modals');
	var db = require('modules/firebase');

	var settings = {
			// selectors
			bodyClass: '.body-class',
			scoreCardClass: '.game-circle__scorecard',
			remainingTriesScoreClass: '.game-score__life',
			gameControlsContainerClass: '.game-controls__container',
			finalScoreClass: '.endgame-modal__final-score',
			remainingTriesContainerClass: '.game-score__remaining-tries',
			circlePoint: '.point',
			currentLocation: '.current-location',
			timeoutContainer: '.timeout-modal__body-content',
			displayUsernameClass: '.header-content .display-username',
			displayHighscoreClass: '.header-content .display-highscore',

			// classes
			lightsToggle: 'toggle-lights',
			redColorClass: 'color-class-red',
			timeoutVibrateClass: 'timeout-vibrate'
		},

		// this is the variable that determines how long before timeout modal is diplaed
		// global variable has to be used to access clearTimeout
		modalShowTimeout,

		publicMembers = {
			reset: function () {
				var $svgElement = document.getElementsByTagName('svg')[0];
				var $scoreCard = document.querySelector(settings.scoreCardClass);
				var $remainingTriesScore = document.querySelector(settings.remainingTriesScoreClass);
				var $gameControls = document.querySelector(settings.gameControlsContainerClass);
				var $finalScore = document.querySelector(settings.finalScoreClass);
				var $point = document.querySelector(settings.circlePoint);
				var $remainingTriesElement = document.querySelector(settings.remainingTriesContainerClass);
				var timeoutContainer = document.querySelector(settings.timeoutContainer);

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
				timeoutContainer.classList.remove(settings.timeoutVibrateClass);
			},

			toggleLight: function () {
				var $body = document.querySelector(settings.bodyClass);
				var $scoreCard = document.querySelector(settings.scoreCardClass);

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
			},

			getCurrentLocation: function () {
				var request = new XMLHttpRequest();
				var $currentLocation = document.querySelector(settings.currentLocation);

				request.onreadystatechange = function () {
					if (request.readyState === 4) {
						if (request.status === 200) {
							var response = JSON.parse(request.responseText);
							$currentLocation.innerHTML = response.city + ' ' + response.region + ', ' + response.country;
						} else {
							$currentLocation.innerHTML = 'Unable to determine current location';
						}
					}
				};

				request.open('Get', 'http://ipinfo.io/json');
				request.send();
			},

			handleUserTimeout: function () {
				clearTimeout(modalShowTimeout);
				modalShowTimeout = setTimeout(function () {
					modals.showTimeoutModal();
				}, 10000);
			},

			endGame: function () {
				var finalScore = score.getCurrentScore(document.querySelector(settings.scoreCardClass));
				var username = publicMembers.getLocalValue('username');
				var highScore = publicMembers.getLocalValue('highscore');

				highScore === null ? highScore = 0 : highScore = highScore;

				modals.showEndgameModal(finalScore, highScore);
				if(finalScore > highScore) {
					// this is user's high score
					db.saveHighScoreToDb(username, finalScore);
				}

				db.saveScoreToDb(username, finalScore);
			},

			getLocalValue: function(param) {
				return document.querySelector('body').getAttribute(param);
			},

			init: function(userData) {
				var $usernameDisplay = document.querySelector(settings.displayUsernameClass);
				var $body = document.querySelector('body');
				var highScore = userData.highScore;

				$body.setAttribute('username', userData.username);
				$body.setAttribute('userId', userData.userId);
				$usernameDisplay.innerText = 'Hello ' + userData.username;

				if(highScore) {
					var $highScoreDisplay = document.querySelector(settings.displayHighscoreClass);
					var str = 'Your high score is ' + highScore + '. Lets beat that !'
					$highScoreDisplay.innerText = str;
					$body.setAttribute('highscore', highScore);
				}
			},

			getState: function(userId) {
				return JSON.parse(localStorage.getItem(userId))
			}
		};

	return publicMembers;
});
