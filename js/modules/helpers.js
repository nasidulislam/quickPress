define(function() {
    var publicMembers = {
        toTitleCase: function(str) {
            return str.replace(
                /\w\S*/g,
                function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }
    }

    return publicMembers;
})
