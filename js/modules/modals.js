define(function () {
	var settings = {
		// selectors
		rulesModalContainer: '.rules-modal',
		timeoutModalContainer: '.timeout-modal',
		endgameModalContainer: '.endgame-modal',
		timeoutSpan: '#timeout-countdown',
		timeoutContainer: '.timeout-modal__body-content',
		finalScoreClass: '.endgame-modal__final-score',
		highScoreClass: '.endgame-modal__high-score',

		// classes
		hideClass: 'hide-content',
		timeoutVibrateClass: 'timeout-vibrate',

		// others
		countdownTime: 15
	},
		// this is the variable that determines how long before game times out
		// global variable has to be used to access clearTimeout
		countdownTimer,
		privateMembers = {
			closeModal: function (el) {
				var $el = document.querySelector(el);
				$el.classList.add(settings.hideClass);
			},

			openModal: function (el) {
				var $el = document.querySelector(el);
				$el.classList.remove(settings.hideClass);
			},

			startTimeout: function () {
				var timeLeft = settings.countdownTime;
				var timeoutSpan = document.querySelector(settings.timeoutSpan);
				var timeoutContainer = document.querySelector(settings.timeoutContainer);

				countdownTimer = setInterval(function () {
					timeLeft--;
					timeoutSpan.textContent = timeLeft;

					// make timeout container vibrate when only 5 secs are left
					if(timeLeft <= 5) {
						timeoutContainer.classList.add(settings.timeoutVibrateClass);
					}

					// implement 15 secs countdown
					if(timeLeft <= 0) {
						clearInterval(countdownTimer);

						// dispatch event that handles end game functionality
						var customEvent = new Event('quickPress: end-game');
						document.body.dispatchEvent(customEvent);
					}
				}, 1000);
			}
		},

		publicMembers = {
			closeRulesModal: function (username) {
				privateMembers.closeModal(settings.rulesModalContainer);
			},

			showTimeoutModal: function () {
				var timeoutSpan = document.querySelector(settings.timeoutSpan);

				// clear and reset timer
				clearInterval(countdownTimer);
				timeoutSpan.textContent = settings.countdownTime;

				// open and start timer
				privateMembers.openModal(settings.timeoutModalContainer);
				privateMembers.startTimeout();
			},

			closeTimeoutModal: function () {
				privateMembers.closeModal(settings.timeoutModalContainer);
			},

			showEndgameModal: function (finalScore, highScore) {
				var $finalScore = document.querySelector(settings.finalScoreClass);

				$finalScore.innerText = 'Your final score is ' + finalScore;
				if(highScore) {
					var $highScore = document.querySelector(settings.highScoreClass);
					$highScore.innerText = 'Congratulations !! This is also your High Score';
				}

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
