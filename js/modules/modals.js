define(function () {

	var settings = {
		// selectors
		rulesModalContainer: '.rules-modal',
		timeoutModalContainer: '.timeout-modal',
		timeoutContainer: '#timeout-countdown',

		// classes
		hideClass: 'hide-content'
	},
		publicMembers = {
			closeRulesModal: function () {
				var $gameModal = document.querySelector(settings.rulesModalContainer);

				$gameModal.classList.add(settings.hideClass);
			},

			showTimeoutModal: function () {
				var $timeoutModal = document.querySelector(settings.timeoutModalContainer);

				$timeoutModal.classList.remove(settings.hideClass);
			},

			startTimeout: function () {
				var timeLeft = 15;
				var timeoutContainer = document.querySelector(settings.timeoutContainer);
				var countdownTimer = setInterval(function () {
					timeLeft--;
					timeoutContainer.textContent = timeLeft;

					if(timeLeft <= 0) {
						clearInterval(countdownTimer);
					}
				}, 1000);
			},

			closeTimeoutModal: function () {
				console.log('blah');
			}
	};

	return publicMembers;
});