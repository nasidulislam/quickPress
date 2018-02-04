define(function () {
    var privateMembers = {
        settings: {
            currentLocation: '.current-location'
        }
    },

   publicMembers = {
       getCurrentLocation: function () {
           var request = new XMLHttpRequest();
           var $currentLocation = document.querySelector(privateMembers.settings.currentLocation);

           request.onreadystatechange = function () {
               if(request.readyState === 4) {
                   if(request.status === 200) {
                       var response = JSON.parse(request.responseText);
                       $currentLocation.innerHTML = response.city + ' ' + response.region + ', ' + response.country;
                   } else {
                       $currentLocation.innerHTML = 'Unable to determine current location';
                   }
               }
           };

           request.open('Get', 'http://ipinfo.io/json');
           request.send();
       }
   };

   return publicMembers;
});