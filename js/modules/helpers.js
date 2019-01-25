define(function() {
    var publicMembers = {
        toTitleCase: function(str) {
            return str.replace(
                /\w\S*/g,
                function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        },

        generateRandomStr: function() {
            var randStr = '';
            var pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 6; i++) {
                randStr += pool.charAt(Math.floor(Math.random() * pool.length));
            }

            return randStr;
        },

        validateCreds: function(form, $username, username, $password, password) {
            // if either username and/or password is empty, then show error and return
            if((username === "") && (password === "")) {
                $username.classList.add('error');
                $password.classList.add('error');
                form.classList.remove('user-db-error');
                form.classList.add('missing-fields-error');
                return false;
            } else if(password === "") {
                $password.classList.add('error');
                $username.classList.remove('error');
                form.classList.remove('user-db-error');
                form.classList.add('missing-fields-error');
                return false;
            } else if(username === "") {
                $username.classList.add('error');
                $password.classList.remove('error');
                form.classList.remove('user-db-error');
                form.classList.add('missing-fields-error');
                return false;
            } else {
                $username.classList.remove('error');
                $password.classList.remove('error');
                form.classList.remove('user-db-error');
                form.classList.remove('missing-fields-error');
                return true;
            }
        }
    }

    return publicMembers;
});
