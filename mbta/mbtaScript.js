<!--
function initMap()
{
	// start of the freedom trail -- totally not stolen from 
	// https://github.com/tuftsdev/WebProgramming/blob/gh-pages/examples/google_maps/gmap_api_example.html
	var landmark = new google.maps.LatLng(42.3599611, -71.0567528);

	// Edit these to change the starting settings of the map
	var myOptions = {
		zoom: 13,
		center: landmark,
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	};

	// makes 'map' a map
	var map = new google.maps.Map(document.getElementById("map"), myOptions);
	
	/*

	var marker = new google.maps.Marker({
		position: ,
		title: ""
	});

	marker.setMap(map);
	
	*/
}

/*
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});
}*/
-->