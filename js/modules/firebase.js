define(function() {
    var publicMembers = {
        saveScoreToDb: function(username, score) {
            firebase.database().ref('users/' + username + '/').update({
                score: score
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
