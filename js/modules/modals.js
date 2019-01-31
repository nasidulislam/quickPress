define(function () {
	var settings = {
		// selectors
		rulesModalContainer: '.rules-modal',
		endgameModalContainer: '.endgame-modal',
		finalScoreClass: '.endgame-modal__final-score',
		highScoreClass: '.endgame-modal__high-score',

		// classes
		hideClass: 'hide-content',

		// others
		countdownTime: 15
	};

	var privateMembers = {
		closeModal: function (el) {
			var $el = document.querySelector(el);
			$el.classList.add(settings.hideClass);
		},

		openModal: function (el) {
			var $el = document.querySelector(el);
			$el.classList.remove(settings.hideClass);
		}
	};

	var publicMembers = {
		closeRulesModal: function () {
			privateMembers.closeModal(settings.rulesModalContainer);
		},

		showEndgameModal: function (finalScore, highScore) {
			var $finalScore = document.querySelector(settings.finalScoreClass);

			$finalScore.innerText = 'Your final score is ' + finalScore;
			privateMembers.openModal(settings.endgameModalContainer);
		},

		closeEndgameModal: function () {
			privateMembers.closeModal(settings.endgameModalContainer);

			// dispatch event that handles end game functionality
			var customEvent = new Event('quickPress: reset');
			document.body.dispatchEvent(customEvent);
		}
	};

	return publicMembers;
});
