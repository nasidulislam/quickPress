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
        }
    }

    return publicMembers;
});
