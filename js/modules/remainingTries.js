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
			vibrateClassDecrease: 'vibrate-class-decrease',
			vibrateClassIncrease: 'vibrate-class-increase'
		},

		privateMembers = {
			decreaseScore: function () {
				var $remainingTriesScore = document.querySelector(settings.remainingTriesScoreClass);

				var newRemainingTries = score.getCurrentScore($remainingTriesScore) - 1;
				score.setScore($remainingTriesScore, newRemainingTries);
			},

			increaseScore: function () {
				var currentRemainingTries, newRemainingTries, $remainingTriesScore;

                $remainingTriesScore = document.querySelector(settings.remainingTriesScoreClass);
                currentRemainingTries = score.getCurrentScore($remainingTriesScore);
                newRemainingTries = currentRemainingTries + 1;
                score.setScore($remainingTriesScore, newRemainingTries);
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
			},

            animate: function (param) {
                var $remainingTriesElement = document.querySelector(settings.remainingTriesContainerClass);

                if(param === 'invalid') {
                    $remainingTriesElement.classList.add(settings.vibrateClassDecrease);
                    $remainingTriesElement.addEventListener('animationend', function () {
                        $remainingTriesElement.classList.remove(settings.vibrateClassDecrease);
                    });
				} else {
                    $remainingTriesElement.classList.add(settings.vibrateClassIncrease);
                    $remainingTriesElement.addEventListener('animationend', function () {
                        $remainingTriesElement.classList.remove(settings.vibrateClassIncrease);
                    });
				}
            },

			toggleHighlight: function () {
                var $remainingTriesElement = document.querySelector(settings.remainingTriesContainerClass);
                var $remainingTriesScore = document.querySelector(settings.remainingTriesScoreClass);

                // make remaining tries section red when user has 0 tries left
                if (score.getCurrentScore($remainingTriesScore) < 1) {
                    $remainingTriesElement.classList.add(settings.redColorClass);
                } else {
                	// remove red coloring when user have more than 0 tries
                    $remainingTriesElement.classList.remove(settings.redColorClass);
				}
            }
		},

		publicMembers = {
			handleRemainingTries: function () {
				var $remainingTriesScore = document.querySelector(settings.remainingTriesScoreClass);

				privateMembers.decreaseScore();
				privateMembers.animate('invalid');
				privateMembers.toggleHighlight();

				// end game functionality. needs improvement
				if (score.getCurrentScore($remainingTriesScore) < 0) {
					privateMembers.endGame();
				}
			},

			removeHighlight: function () {
				privateMembers.toggleHighlight();
			},

			increaseScoreAndAnimate: function () {
				privateMembers.increaseScore();
                privateMembers.animate();
            }
		};

	return publicMembers;
});