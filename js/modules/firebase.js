define(function() {
    var publicMembers = {
        saveScoreToDb: function(userId, score) {
            firebase.database().ref('users/' + userId + '/').update({
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
