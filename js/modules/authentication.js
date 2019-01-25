define(function(require) {
    // module imports
    var helpers = require('modules/helpers');
    var util = require('modules/util');
    var modals = require('modules/modals');

    var publicMembers = {
        runLogin: function(username, password) {
    		var userId = username + '-' + password;

            firebase.database()
                .ref('users/' + userId + '/')
                .once('value')
                .then(function(snapshot) {
                    // if user data exists, then retrieve data and init app
                    var userData = snapshot.val();
                    if(userData !== null) {
                        util.init(userData);
                    } else {
                        // if it doesn't, then create data object for current user
                        // and save it in database
                        var randStr = '-' + helpers.generateRandomStr()
                        var uniqueUsername = username + randStr;
                        var userData = {
                            username: username,
                            password: password,
                            userId: userId,
                            uniqueUsername: uniqueUsername
                        }

                        firebase.database().ref('users/' + userId + '/').set(userData);
                        util.init(userData);
                    }

                    modals.closeRulesModal();
                }, function(error) {
                console.log(error);
            });
        },

        handleAuth: function(form, username, password) {
            var formType = form.getAttribute('data-form-type');

            // check if user exists in database
            firebase.database()
                .ref('users/' + username + '/')
                .once('value')
                .then(function(snapshot) {
                    var userData = snapshot.val();

                    // if user exists in db
                    if(userData !== null) {
                        if(formType === 'signup') {
                            form.classList.add('user-db-error');
                        } else if(formType === 'login') {
                            //TODO run login
                        }
                    } else {
                        // if user doesn't exist in db
                        if(formType === 'signup') {
                            //TODO run signup
                        } else if(formType === 'login') {
                            form.classList.add('user-db-error');
                        }
                    }
                }, function(error) {
                    console.log('error');
            });
        }
    }

    return publicMembers;
});
