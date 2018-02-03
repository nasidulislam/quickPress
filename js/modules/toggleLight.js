define(function () {
    var privateMembers = {
        settings: {
            bodyClass: '.body-class',
            lightsToggle: 'toggle-lights',
            scoreCardClass: '.game-circle__scorecard'
        }
    },

    publicMembers = {
        toggleLight: function () {
           var $body = document.querySelector(privateMembers.settings.bodyClass);
           var $scoreCard = document.querySelector(privateMembers.settings.scoreCardClass);

            $body.classList.toggle(privateMembers.settings.lightsToggle);

            // swap color palette for scorecard
            switch ($scoreCard.attributes.fill.value) {
                case 'white':
                    $scoreCard.attributes.fill.value = 'blue';
                    break;
                case 'blue':
                    $scoreCard.attributes.fill.value = 'white';
                    break;
            }
        }
    };

    return publicMembers;
});