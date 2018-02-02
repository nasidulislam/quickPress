define(function() {
    var publicMembers = {
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