define(function(require) {
    // module imports
    var helpers = require('modules/helpers');
    var util = require('modules/util');
    var modals = require('modules/modals');

    var privateMembers = {
        signUp: function(username, password) {
            var randStr = '-' + helpers.generateRandomStr();
            var userId = username + randStr;
            var userData = {
                username: username,
                password: password,
                userId: userId
            }

            firebase.database()
                .ref('users/' + username + '/')
                .set(userData);

            util.init(userData);

            modals.closeRulesModal();
        },

        login: function(username, password, userData, form) {
            // check if provided password matches whats in db
            if(password === userData.password) {
                util.init(userData);
                modals.closeRulesModal();
            } else {
                // username is right but password is not, throw error and return
                form.classList.add('incorrect-password-error');
            }
        }
    };

    var publicMembers = {
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
                            // and we're on sign up, show "user already exists" error
                            form.classList.add('user-db-error');
                        } else if(formType === 'login') {
                            // but if we're on login form, then log user in
                            privateMembers.login(username, password, userData, form);
                        }
                    } else {
                        // if user doesn't exist in db
                        if(formType === 'signup') {
                            // and we're on signup form, then sign user up
                            privateMembers.signUp(username, password);
                        } else if(formType === 'login') {
                            // but if we're on login form, show "user doesn't exist" error
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
