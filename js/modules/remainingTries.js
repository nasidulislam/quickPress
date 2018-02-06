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

		publicMembers = {
			handleRemainingTries: function () {
				var newRemainingTries, $remainingTriesScore, $remainingTriesElement,
					$finalScore, $scoreCard, $svgElement;

				$remainingTriesScore = document.querySelector(settings.remainingTriesScoreClass);
				$remainingTriesElement = document.querySelector(settings.remainingTriesContainerClass);
				$finalScore = document.querySelector(settings.finalScoreClass);
				$scoreCard = document.querySelector(settings.scoreCardClass);
				$svgElement = document.getElementsByTagName('svg')[0];

				// decrease score
				newRemainingTries = score.getCurrentScore($remainingTriesScore) - 1;
				score.setScore($remainingTriesScore, newRemainingTries);

				// animate to visually indicate change in remaining tries left
				publicMembers.handleRemainingTriesAnimation();

				// make remaining tries section red when user has 0 tries left
				if (score.getCurrentScore($remainingTriesScore) === 0) {
					$remainingTriesElement.classList.add(settings.redColorClass);
				}

				// handles end game functionality --> should probably make its own function
				if (score.getCurrentScore($remainingTriesScore) < 0) {
					alert('game over');
					score.setScore($remainingTriesScore, 0);
					$finalScore.innerHTML = 'Your Final Score: <span class="final-score">' + score.getCurrentScore($scoreCard) + '</span>';
					$svgElement.pauseAnimations();
				}
			},

			handleRemainingTriesAnimation: function () {
				var $remainingTriesElement = document.querySelector(settings.remainingTriesContainerClass);

				$remainingTriesElement.classList.add(settings.vibrateClass);
				$remainingTriesElement.addEventListener('animationend', function () {
					$remainingTriesElement.classList.remove(settings.vibrateClass);
				});
			}
		};

	return publicMembers;
});