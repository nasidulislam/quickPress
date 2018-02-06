define(function () {
	var settings = {
			circlePoint: '.point'
		},

		publicMembers = {
			handlePointFrequency: function () {
				var currentFreq, $point, newFreq;

				$point = document.querySelector(settings.circlePoint);
				currentFreq = publicMembers.getRotationFrequency($point);

				// bypass initial duration value being set to nothing on svg element
				if (isNaN(currentFreq)) {
					currentFreq = 20;
				}

				newFreq = publicMembers.generateNewFrequency(currentFreq);
				publicMembers.setRotationFrequency($point, newFreq);
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
			},

			generateNewFrequency: function (freq) {
				if (freq >= 10) {
					return (freq / 2);
				} else if (freq >= 2) {
					return (freq / (4 / 3));
				} else if (freq >= 0.6) {
					return (freq / 1.125);
				} else {
					return (freq / 1.125);
				}
			}
		};

	return publicMembers;
});