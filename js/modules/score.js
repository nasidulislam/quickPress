define(function () {
    var privateMembers = {
        settings: {
            scoreCardClass: '.game-circle__scorecard',
            remainingTriesScoreClass: '.game-score__life',
            currentScore: ''
        }
    },

    publicMembers = {
        handleScoring: function () {
            var currentScore, newScore,
			currentRemainingTries, newRemainingTries, $scoreCard;

            $scoreCard = document.querySelector(privateMembers.settings.scoreCardClass);
            $remainingTriesScore = document.querySelector(privateMembers.settings.remainingTriesScoreClass);
            currentScore = publicMembers.getCurrentScore($scoreCard);
            newScore = currentScore + 1;
            privateMembers.settings.currentScore = newScore;

            // grant the user an additional try for every 5 points scored
            if(privateMembers.settings.currentScore % 5 === 0) {
                currentRemainingTries = publicMembers.getCurrentScore($remainingTriesScore);
                newRemainingTries = currentRemainingTries + 1;
                setScore($remainingTriesScore, newRemainingTries);
            }

            publicMembers.setScore($scoreCard, newScore);
        },

        getCurrentScore: function (el) {
            var currentScore;

            currentScore = parseInt(el.innerHTML);
            return currentScore;
        },

        setScore: function (el, score) {
            el.innerHTML = score;
        }
    };

    return publicMembers;
});