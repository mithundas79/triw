(function ($) {
  var geocoder;
  var map;
  var maxZoomService;
  var markersArray = [];

  function initializeMap() {
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(50.9124582, -105.8068414);

	var mapOptions = {
	  center: latlng,
	  zoom: 8,
	  mapTypeId: google.maps.MapTypeId.HYBRID,
	  zoomControl: true,
	  //overviewMapControl: true,
	  //panControl: true,
	  mapTypeControl: true,
	  //scaleControl: true,
	  streetViewControl: true,
	  zoomControlOptions: {
		style: google.maps.ZoomControlStyle.SMALL
	  }
	};
	map = new google.maps.Map(document.getElementById('listing_map'),
			mapOptions);

	clearOverlays();
	markAddress();


	maxZoomService = new google.maps.MaxZoomService();

	$(".markAddress").blur(function () {

	  clearOverlays();
	  markAddress();
	});

  };
  
  google.maps.event.addDomListener(window, 'load', initializeMap);
  
  var showMap = function (){
	google.maps.event.addDomListener(window, 'load', initializeMap);
  }

  var updateMapCenter = function () {

  };


  var clearOverlays = function () {
	for (var i = 0; i < markersArray.length; i++) {
	  markersArray[i].setMap(null);
	}
	markersArray.length = 0;
  }

  var markAddress = function (address, address2, city, zip, province, country) {
	var final_addr = address;
	if (address2 != '') {
	  final_addr += ',' + address2;
	}
	if (city != '') {
	  final_addr += ',' + city;
	}
	if (province != '') {
	  final_addr += ',' + province;
	}
	if (country != '') {
	  final_addr += ',' + country;
	}
	if (zip != '') {
	  final_addr += ',' + zip;
	}

	geocoder.geocode({'address': final_addr}, function (results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {
		map.setCenter(results[0].geometry.location);
		map.setZoom(11);
		var marker = new google.maps.Marker({
		  map: map,
		  animation: google.maps.Animation.DROP,
		  position: results[0].geometry.location
		});

		markersArray.push(marker);
	  } else {
		console.log("Geocode was not successful for the following reason: " + status);
	  }
	});
  };

});