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
			endGameModalClass: '.endgame-modal',
			leaderboardsTable: '.game-leaderboards__table',


			// classes
			lightsToggle: 'toggle-lights',
			redColorClass: 'color-class-red',
			timeoutVibrateClass: 'timeout-vibrate',
			congratulationsMsgClass: 'show-congratulations'
		},

		privateMembers = {
			buildLeaderboards: function(data) {
				var $table = document.querySelector(settings.leaderboardsTable);
				var users = data.val();
				var usersArray = Object.keys(users);
				var row;
				var elements = [];

				usersArray.forEach(function(key) {
					if(users[key].highScore) {
						row = "<div class='row'><div class='name'>" + users[key].username + "</div><div class='score'>" + users[key].highScore + "</div></div>";
						$table.insertAdjacentHTML('beforeend', row);
					}
				});

				$table.querySelectorAll('.row').forEach(function(el) {
					elements.push(el);
				});

				$table.innerHTML = '';
				elements.sort(function(a, b) {
					return b.querySelector('.score').textContent - a.querySelector('.score').textContent;
				});

				elements.forEach(function(el) {
					$table.appendChild(el);
				});
			}
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
				var $endGameModalContainer = document.querySelector(settings.endGameModalClass);

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
				$endGameModalContainer.classList.remove(settings.congratulationsMsgClass);
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
				var highScore = parseInt(publicMembers.getLocalValue('highscore'));

				modals.showEndgameModal(finalScore, highScore);

				if(finalScore > highScore) {
					// this is user's high score
					highScore = finalScore;
					db.saveHighScoreToDb(username, highScore);
					publicMembers.setAndDisplayLocalHighScore(highScore);
					document.querySelector(settings.endGameModalClass).classList.add(settings.congratulationsMsgClass);
				}

				db.saveScoreToDb(username, finalScore);
			},

			getLocalValue: function(param) {
				return document.querySelector('body').getAttribute(param);
			},

			setLocalValue: function(attr, value) {
				document.querySelector('body').setAttribute(attr, value);
			},

			setAndDisplayLocalHighScore: function(highScore) {
				var $highScoreDisplay = document.querySelector(settings.displayHighscoreClass);
				var str = 'Your high score is ' + highScore + '. Lets beat that !';

				$highScoreDisplay.innerText = str;
				publicMembers.setLocalValue('highscore', highScore);
			},

			init: function(userData) {
				var $usernameDisplay = document.querySelector(settings.displayUsernameClass);
				var highScore = userData.highScore;

				publicMembers.setLocalValue('username', userData.username);
				publicMembers.setLocalValue('userId', userData.userId);
				$usernameDisplay.innerText = 'Hello ' + userData.username;

				if(highScore) {publicMembers.setAndDisplayLocalHighScore(highScore)}

				db.getAllUserDataAndDo(privateMembers.buildLeaderboards);
			}
		};

	return publicMembers;
});
