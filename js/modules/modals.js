define(function () {

	var settings = {
		// selectors
		rulesModalContainer: '.rules-modal',
		timeoutModalContainer: '.timeout-modal',
		timeoutContainer: '#timeout-countdown',

		// classes
		hideClass: 'hide-content',

		// others
		countdownTime: 15
	},
		// this is the variable that determines how long before game times out
		// global variable has to be used to access clearTimeout
		countdownTimer,
		privateMembers = {
			closeModal: function ($el) {
				$el.classList.add(settings.hideClass);
			},

			openModal: function ($el) {
				$el.classList.remove(settings.hideClass);
			},

			startTimeout: function () {
				var timeLeft = settings.countdownTime;
				var timeoutContainer = document.querySelector(settings.timeoutContainer);

				countdownTimer = setInterval(function () {
					timeLeft--;
					timeoutContainer.textContent = timeLeft;

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
			closeRulesModal: function () {
				var $gameModal = document.querySelector(settings.rulesModalContainer);
				privateMembers.closeModal($gameModal);
			},

			showTimeoutModal: function () {
				var $timeoutModal = document.querySelector(settings.timeoutModalContainer);
				var timeoutContainer = document.querySelector(settings.timeoutContainer);

				// clear and reset timer
				clearInterval(countdownTimer);
				timeoutContainer.textContent = settings.countdownTime;

				// open and start timer
				privateMembers.openModal($timeoutModal);
				privateMembers.startTimeout();
			},

			closeTimeoutModal: function () {
				var $timeoutModal = document.querySelector(settings.timeoutModalContainer);
				privateMembers.closeModal($timeoutModal);
			}
	};

	return publicMembers;
});