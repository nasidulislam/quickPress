define(function() {
    var settings = {
        isDbInit: false
    };

    var privateMembers = {
        initializeDatabase: function() {
            var config = {
              apiKey: "AIzaSyAL0uZwywaiae1IYS-jtMU_Qrvbvkol0o4",
              authDomain: "quickpress-73517.firebaseapp.com",
              databaseURL: "https://quickpress-73517.firebaseio.com",
              projectId: "quickpress-73517"
            };
            firebase.initializeApp(config);
            settings.isDbInit = true;
        }
    };

    var publicMembers = {
        saveToDb: function(username, score) {
            // only initialize database if it has not been done before
            if(!settings.isDbInit) {
                privateMembers.initializeDatabase();
            }

            firebase.database().ref(username + '/').set({
                score: score,
                userId: 'blah',
                location: 'columbus'
            });
        }
    }

    return publicMembers;
});
