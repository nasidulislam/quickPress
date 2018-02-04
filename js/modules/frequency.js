define(function () {
    var publicMembers = {
        handlePointFrequency: function (el) {
            var currentDuration;

            currentDuration = publicMembers.getRotationFrequency(el);

            // bypass initial duration value being set to nothing on svg element
            if (isNaN(currentDuration)) {
                currentDuration = 20;
            }

            publicMembers.setRotationFrequency(el, currentDuration / 2); //TODO : write a difficulty implementation function
        },
        getRotationFrequency: function (el) {
            var attrs, freq, freqNumber;

            attrs = el.attributes;
            freq = attrs.dur.value;
            freqNumber = parseFloat(freq.substr(0, freq.length - 1));

            return freqNumber;
        },

        setRotationFrequency: function (el, freq) {
            var attrs;

            attrs = el.attributes;
            attrs.dur.value = freq + 's';
        }
    };

    return publicMembers;
});