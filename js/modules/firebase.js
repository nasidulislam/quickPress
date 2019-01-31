define(function() {
    var publicMembers = {
        saveScoreToDb: function(username, score) {
            firebase.database().ref('users/' + username + '/').update({
                score: score
            });
        },

        saveHighScoreToDb: function(username, highScore) {
            firebase.database().ref('users/' + username + '/').update({
                highScore: highScore
            });
        },

        getAllUserDataAndDo: function(successCallback) {
            firebase.database()
                .ref('users/')
                .once('value')
                .then(successCallback);
        }
    };

    return publicMembers;
});
