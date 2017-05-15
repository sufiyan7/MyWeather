// console.log("Pop up Done");
var Geo={};

if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(success,error);
}
else {
alert('Geolocation is not supported');
}

function error() {
alert("That's weird! We couldn't find you!");
}

function success(position) {
       Geo.lat = position.coords.latitude;
       Geo.long = position.coords.longitude;
        Weather = "http://api.openweathermap.org/data/2.5/weather?lat="+Geo.lat+"&lon="+Geo.long+"&APPID=d370efc95c0bb84df9bb32e0c4faa4e3";



      fetch(Weather)
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
              var location = data["name"];
              var temp = data["main"]["temp"];
              var desc = data["weather"]["0"]["description"];


              var option = {
                type : "basic",
                title : "Weather at "+ location,
                message : "It is currently "+temp+"F with "+desc,
                iconUrl : "hazy.gif"
              };

              chrome.notifications.create(option,callback);

              function callback(){
                console.log("Success");
                }

            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
      }
