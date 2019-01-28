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
			displayUsernameClass: '.header-content .display-username',
			displayHighscoreClass: '.header-content .display-highscore',
			endGameModalClass: '.endgame-modal',
			leaderboardsTable: '.game-leaderboards__table',


			// classes
			lightsToggle: 'toggle-lights',
			redColorClass: 'color-class-red',
			congratulationsMsgClass: 'show-congratulations'
		};

	var privateMembers = {
			buildLeaderboards: function(data) {
				var $table = document.querySelector(settings.leaderboardsTable);
				var users = data.val();
				var usersArray = Object.keys(users);
				var row;
				var elements = [];

				$table.innerText = '';
				var $container = document.createElement('div');
				$container.className = 'container';

				usersArray.forEach(function(key) {
					if(users[key].highScore) {
						row = "<div class='row'><div class='name'>" + users[key].username + "</div><div class='score'>" + users[key].highScore + "</div></div>";
						$container.insertAdjacentHTML('beforeend', row);
					}
				});

				$container.querySelectorAll('.row').forEach(function(el) {
					elements.push(el);
				});

				elements.sort(function(a, b) {
					return b.querySelector('.score').textContent - a.querySelector('.score').textContent;
				});

				elements.forEach(function(el) {
					$container.appendChild(el);
				});

				$container.childNodes.forEach(function(el, idx) {
					if(idx > 5) {
						$container.removeChild(el);
					}
				});

				$table.insertAdjacentHTML('beforeend', $container.innerHTML);
			}
		};

	var publicMembers = {
			reset: function () {
				var $svgElement = document.getElementsByTagName('svg')[0];
				var $scoreCard = document.querySelector(settings.scoreCardClass);
				var $remainingTriesScore = document.querySelector(settings.remainingTriesScoreClass);
				var $gameControls = document.querySelector(settings.gameControlsContainerClass);
				var $finalScore = document.querySelector(settings.finalScoreClass);
				var $point = document.querySelector(settings.circlePoint);
				var $remainingTriesElement = document.querySelector(settings.remainingTriesContainerClass);
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
				$endGameModalContainer.classList.remove(settings.congratulationsMsgClass);

				db.getAllUserDataAndDo(privateMembers.buildLeaderboards);
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
			}
		};

	return publicMembers;
});
