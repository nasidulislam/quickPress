define(function () {
	var settings = {
		scoreCardClass: '.game-circle__scorecard',
		errorMarginDefault: 50
	};

	var publicMembers = {
		handleScoring: function () {
			var $scoreCard = document.querySelector(settings.scoreCardClass);
			var currentScore = publicMembers.getCurrentScore($scoreCard);
			var newScore = currentScore + 1;
            publicMembers.setScore($scoreCard, newScore);

			// grant the user an additional try for every 5 points scored
			if (newScore % 5 === 0) {
                var customEvent = new Event('quickPress: increase-animate');
                document.body.dispatchEvent(customEvent);
			}
		},

		isValidScore: function () {
			var $svgElement = document.getElementsByTagName('svg')[0];
			var $pointSvg = $svgElement.querySelectorAll('circle')[0];
			var $puntSvg = $svgElement.querySelectorAll('circle')[1];
			var errorMarginDefault = settings.errorMarginDefault;

			// if user scores correctly, then increment score, increase point frequency and place punt somewhere
			$svgElement.unpauseAnimations();
			var currentPointLocation = {
				pointX: $pointSvg.getScreenCTM().e,
				pointY: $pointSvg.getScreenCTM().f
			};

			var currentPuntLocation = {
				puntX: $puntSvg.getScreenCTM().e,
				puntY: $puntSvg.getScreenCTM().f
			};

			var userError = {
				marginX: currentPointLocation.pointX - currentPuntLocation.puntX,
				marginY: currentPointLocation.pointY - currentPuntLocation.puntY
			};

			return (Math.abs(userError.marginX) <= errorMarginDefault && (Math.abs(userError.marginY) <= errorMarginDefault));
		},

		getCurrentScore: function (el) {
			return parseInt(el.innerHTML)
		},

		setScore: function (el, score) {
			el.innerHTML = score;
		}
	};

	return publicMembers;
});