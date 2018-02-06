define(function () {
	var settings = {
			scoreCardClass: '.game-circle__scorecard',
			remainingTriesScoreClass: '.game-score__life',
			currentScore: '',
			errorMarginDefault: 50
		},

		publicMembers = {
			handleScoring: function () {
				var currentScore, newScore, $remainingTriesScore,
					currentRemainingTries, newRemainingTries, $scoreCard;

				$scoreCard = document.querySelector(settings.scoreCardClass);
				$remainingTriesScore = document.querySelector(settings.remainingTriesScoreClass);
				currentScore = publicMembers.getCurrentScore($scoreCard);
				newScore = currentScore + 1;
				settings.currentScore = newScore;

				// grant the user an additional try for every 5 points scored
				if (settings.currentScore % 5 === 0) {
					currentRemainingTries = publicMembers.getCurrentScore($remainingTriesScore);
					newRemainingTries = currentRemainingTries + 1;
					publicMembers.setScore($remainingTriesScore, newRemainingTries);
				}

				publicMembers.setScore($scoreCard, newScore);
			},

			isValidScore: function () {
				var currentPointLocation, currentPuntLocation, userError, errorMarginDefault,
					$svgElement, $pointSvg, $puntSvg;

				$svgElement = document.getElementsByTagName('svg')[0];
				$pointSvg = $svgElement.querySelectorAll('circle')[0];
				$puntSvg = $svgElement.querySelectorAll('circle')[1];
				errorMarginDefault = settings.errorMarginDefault;

				// if user scores correctly, then increment score, increase point frequency and place punt somewhere
				$svgElement.unpauseAnimations();
				currentPointLocation = {
					pointX: $pointSvg.getScreenCTM().e,
					pointY: $pointSvg.getScreenCTM().f
				};

				currentPuntLocation = {
					puntX: $puntSvg.getScreenCTM().e,
					puntY: $puntSvg.getScreenCTM().f
				};

				userError = {
					marginX: currentPointLocation.pointX - currentPuntLocation.puntX,
					marginY: currentPointLocation.pointY - currentPuntLocation.puntY
				};

				return (Math.abs(userError.marginX) <= errorMarginDefault && (Math.abs(userError.marginY) <= errorMarginDefault));
			},

			getCurrentScore: function (el) {
				var currentScore;

				currentScore = parseInt(el.innerHTML);
				return currentScore;
			},

			setScore: function (el, score) {
				el.innerHTML = score;
			}
		};

	return publicMembers;
});