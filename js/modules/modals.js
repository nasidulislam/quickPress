define(function () {

	var settings = {
		// selectors
		rulesModalContainer: '.game-modal',

		// classes
		hideClass: 'hide-content'
	},
		publicMembers = {
			closeRulesModal: function () {
				var $gameModal = document.querySelector(settings.rulesModalContainer);

				$gameModal.classList.add(settings.hideClass);
			}
	};

	return publicMembers;
});