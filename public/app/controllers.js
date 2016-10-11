angular.module('mapRight').controller('indexController', ['$scope', '$http', function($scope, $http){
    
    
    
  $http({
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=47.60, -122.33&radius=25000&type=restaurant&key=AIzaSyDbTr_Fm82BVveREy0HHh-E6SFPMmee-AM'

  }).then(function successCallback(res) {
      console.log(res);
      var placesArray = [];
      for(var i = 0; i < res.data.results.length; i++){
        var placeObj = {};
        placeObj.type = 'Feature';
        placeObj.geometry = {
          "type": "Point",
          "coordinates": [res.data.results[i].geometry.location.lng, res.data.results[i].geometry.location.lat]
        }
        placeObj.properties = {
          title: res.data.results[i].photos[0]["html_attributions"],
          address: res.data.results[i].vicinity,
          rating: res.data.results[i].rating,
          "marker-symbol": i+1,
          icon: res.data.results[i].icon,
          "marker-color": "#D1440A",
          "marker-size": 'large'
          
        }
        placesArray.push(placeObj);
        console.log(placeObj);
      }

      var map = L.mapbox.map('map').setView([47.615, -122.332], 15);
      
       // map token for mapbox
      L.mapbox.accessToken =
      'pk.eyJ1Ijoic2hhbmVlaGxlcnQiLCJhIjoiY2l1NG03djA0MGphcTJ5cGcwMHNkdWEyNSJ9.-xpz9B7SMsdt33uVAjNIhg';
      
       // streets v-8 style
      L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v9').addTo(map);
    
      // adding feature layer to map
      var myLayer = L.mapbox.featureLayer().addTo(map);
      
      // layer add function
      myLayer.on('layeradd', function (e) {
        var marker = e.layer;
        dot = marker.feature;
        

        var popupContent = '<h1>'
                                 +'<img src="'+dot.properties.icon+'"><br>'
                                 +dot.properties.title+'<br>'
                                 +dot.properties.address+'<br>'
                                 +dot.properties.rating+'<br>'
                           '</h1>';


          marker.bindPopup(popupContent, {
            closeButton: false,
            minWidth: 320
            
            })

      });

      myLayer.setGeoJSON(placesArray);

      console.log(200);




   
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(res) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
       });




   


  }]);