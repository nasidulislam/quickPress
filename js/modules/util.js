define(function (require) {

    // modules
    var frequency = require('modules/frequency');
    var score = require('modules/score');

    var privateMembers = {
            settings: {
                // selectors
                bodyClass: '.body-class',
                scoreCardClass: '.game-circle__scorecard',
                remainingTriesScoreClass: '.game-score__life',
                gameControlsContainerClass: '.game-controls__container',
                finalScoreClass: '.game-score__final',
                remainingTriesContainerClass: '.game-score__remaining-tries',
                circlePoint: '.point',
                currentLocation: '.current-location',

                // classes
                lightsToggle: 'toggle-lights',
                redColorClass: 'color-class-red'
            }
        },

        publicMembers = {
            handleReset: function () {
                var $svgElement = document.getElementsByTagName('svg')[0];
                var $scoreCard = document.querySelector(privateMembers.settings.scoreCardClass);
                var $remainingTriesScore = document.querySelector(privateMembers.settings.remainingTriesScoreClass);
                var $gameControls = document.querySelector(privateMembers.settings.gameControlsContainerClass);
                var $finalScore = document.querySelector(privateMembers.settings.finalScoreClass);
                var $point = document.querySelector(privateMembers.settings.circlePoint);
                var $remainingTriesElement = document.querySelector(privateMembers.settings.remainingTriesContainerClass);

                // pause all svg animation on reset and set initial position to 0
                $svgElement.pauseAnimations();
                $svgElement.setCurrentTime(0);
                frequency.setRotationFrequency($point, '');

                // reset all scores
                score.setScore($scoreCard, 0);
                score.setScore($remainingTriesScore, 3);

                // remove classes and html added
                $gameControls.classList.remove(privateMembers.settings.gameStart);
                $finalScore.textContent = '';
                $remainingTriesElement.classList.remove(privateMembers.settings.redColorClass);
            },

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
            },

            getCurrentLocation: function () {
                var request = new XMLHttpRequest();
                var $currentLocation = document.querySelector(privateMembers.settings.currentLocation);

                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        if (request.status === 200) {
                            var response = JSON.parse(request.responseText);
                            $currentLocation.innerHTML = response.city + ' ' + response.region + ', ' + response.country;
                        } else {
                            $currentLocation.innerHTML = 'Unable to determine current location';
                        }
                    }
                };

                request.open('Get', 'http://ipinfo.io/json');
                request.send();
            }
        };

    return publicMembers;
});