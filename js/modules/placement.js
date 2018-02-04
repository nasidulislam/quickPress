define(function (require) {
    // modules
    var frequency = require('modules/frequency');

    var privateMembers = {
            settings: {
                // selectors
                circlePoint: '.point',
                circlePunt: '.punt',

                //others
                rangeMin: 0.000025,
                rangeMax: 0.000075
            },

            getRandomFloat: function (min, max) {
                return Math.random() * (max - min) + min;
            }
        },

        publicMembers = {
            handlePointFrequency: function (el) {
                var currentDuration;

                currentDuration = frequency.getRotationFrequency(el);

                // bypass initial duration value being set to nothing on svg element
                if (isNaN(currentDuration)) {
                    currentDuration = 20;
                }

                frequency.setRotationFrequency(el, currentDuration / 2); //TODO : write a difficulty implementation function
            },

            handlePuntPlacement: function () {
                var rangeMin = privateMembers.settings.rangeMin;
                var rangeMax = privateMembers.settings.rangeMax;
                var $svgElement = document.getElementsByTagName('svg')[0];
                var $puntSvg = $svgElement.querySelectorAll('circle')[1];
                var $puntAnimationElement = $puntSvg.querySelector('animateMotion');
                var randomPlacementVariable = parseFloat((privateMembers.getRandomFloat(rangeMin, rangeMax)).toFixed(6)) * Math.pow(10, 4);

                setTimeout(function () {
                    $puntAnimationElement.setAttribute('repeatCount', '' + randomPlacementVariable);
                    // have to reset current time to 0 every time to keep punt in place
                    $svgElement.setCurrentTime(0);
                }, randomPlacementVariable);
            }
        };

    return publicMembers;
});