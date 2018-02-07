define(function (require) {
	// modules
	var score = require('modules/score');

	var settings = {
			// selectors
			remainingTriesScoreClass: '.game-score__life',
			remainingTriesContainerClass: '.game-score__remaining-tries',
			finalScoreClass: '.game-score__final',
			scoreCardClass: '.game-circle__scorecard',

			// classes
			redColorClass: 'color-class-red',
			vibrateClass: 'vibrate-class'
		},

		privateMembers = {
			decreaseScore: function () {
				var $remainingTriesScore = document.querySelector(settings.remainingTriesScoreClass);

				var newRemainingTries = score.getCurrentScore($remainingTriesScore) - 1;
				score.setScore($remainingTriesScore, newRemainingTries);
			},

			highlightAndAnimate: function () {
				var $remainingTriesElement = document.querySelector(settings.remainingTriesContainerClass);
				var $remainingTriesScore = document.querySelector(settings.remainingTriesScoreClass);

				// animate
				$remainingTriesElement.classList.add(settings.vibrateClass);
				$remainingTriesElement.addEventListener('animationend', function () {
					$remainingTriesElement.classList.remove(settings.vibrateClass);
				});

				// make remaining tries section red when user has 0 tries left
				if (score.getCurrentScore($remainingTriesScore) === 0) {
					$remainingTriesElement.classList.add(settings.redColorClass);
				}
			},

			endGame: function () {
				var $remainingTriesScore, $finalScore, $scoreCard, $svgElement;

				$remainingTriesScore = document.querySelector(settings.remainingTriesScoreClass);
				$finalScore = document.querySelector(settings.finalScoreClass);
				$scoreCard = document.querySelector(settings.scoreCardClass);
				$svgElement = document.getElementsByTagName('svg')[0];

				alert('game over');
				score.setScore($remainingTriesScore, 0);
				$finalScore.innerHTML = 'Your Final Score: <span class="final-score">' + score.getCurrentScore($scoreCard) + '</span>';
				$svgElement.pauseAnimations();
			}
		},

		publicMembers = {
			handleRemainingTries: function () {
				var $remainingTriesScore = document.querySelector(settings.remainingTriesScoreClass);

				privateMembers.decreaseScore();
				privateMembers.highlightAndAnimate();

				// end game functionality. needs improvement
				if (score.getCurrentScore($remainingTriesScore) < 0) {
					privateMembers.endGame();
				}
			},

			removeHighlight: function () {
				var $remainingTriesElement = document.querySelector(settings.remainingTriesContainerClass);

				$remainingTriesElement.classList.remove(settings.redColorClass);
			}
		};

	return publicMembers;
});