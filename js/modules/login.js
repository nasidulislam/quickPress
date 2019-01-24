define(function(require) {
    // module imports
    var helpers = require('modules/helpers');
    var util = require('modules/util');

    var publicMembers = {
        runLogin: function(username, password) {
    		var localStorageArray = Object.keys(localStorage);
    		var localStorageKey = username + '-' + password;

    		localStorageArray.forEach(function(key) {
                // check if local storage has data saved for this user
    			if(key.indexOf(localStorageKey) !== -1) {
    				// if it does, then retrieve and init app with data

                    util.setUsername(localStorageKey.username);
    			} else {
                    // if it doesn't, then create data object for current user
                    // and save it in local storage
                    var randStr = '-' + helpers.generateRandomStr()
                    var uniqueUsername = username + randStr;

                    util.setUsername(username);
                    localStorage.setItem(localStorageKey, JSON.stringify({
                        username: username,
                        password: password,
                        uniqueUsername: uniqueUsername
                    }));
    			}
    		});
        }
    }

    return publicMembers;
});
