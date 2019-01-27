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

        getAllUserData: function() {
            firebase.database()
                .ref('users/')
                .once('value')
                .then(function(snapshot) {
                    console.log(snapshot.val());
            });
        }
    }

    return publicMembers;
});
