<!--
stationData = [
	 {"name":"Alewife","loc":{"lat": 42.395428  ,"lng":-71.142483}},
	 {"name":"Davis","loc":{"lat": 42.39674   ,"lng":-71.121815}},
	 {"name":"Porter Square","loc":{'lat': 42.3884    ,'lng':-71.11914899999999}},
	 {"name":"Harvard Square","loc":{"lat": 42.373362  ,"lng":-71.118956}},
	 {"name":"Central Square","loc":{"lat": 42.365486  ,"lng":-71.103802}},
	 {"name":"Kendall/MIT","loc":{"lat": 42.36249079,"lng":-71.08617653}},
	 {"name":"Charles/MGH","loc":{"lat": 42.361166  ,"lng":-71.070628}},
  	 {"name":"Park Street","loc":{"lat": 42.35639457,"lng":-71.0624242}},
  	 {"name":"Downtown Crossing","loc":{"lat": 42.355518  ,"lng":-71.060225}},
	 {"name":"South Station","loc":{"lat": 42.352271  ,"lng":-71.05524200000001}},
	 {"name":"Broadway","loc":{"lat": 42.342622  ,"lng":-71.056967}},
	 {"name":"Andrew","loc":{"lat": 42.330154  ,"lng":-71.057655}}, 
	 {"name":"JFK/UMass","loc":{"lat": 42.320685  ,"lng":-71.052391}},
	 {"name":"Savin Hill","loc":{"lat": 42.31129   ,"lng":-71.053331}},
	 {"name":"Fields Corner","loc":{"lat": 42.300093  ,"lng":-71.061667}},
	 {"name":"Shawmut","loc":{"lat": 42.29312583,"lng":-71.06573796000001}},
	 {"name":"Ashmont","loc":{"lat": 42.284652  ,"lng":-71.06448899999999}},
	 {"name":"North Quincy","loc":{"lat": 42.275275  ,"lng":-71.029583}},
	 {"name":"Wollaston","loc":{"lat": 42.2665139 ,"lng":-71.0203369}},
	 {"name":"Quincy Center","loc":{"lat": 42.251809  ,"lng":-71.005409}},
	 {"name":"Quincy Adams","loc":{"lat": 42.233391  ,"lng":-71.007153}},
	 {"name":"Braintree","loc":{"lat": 42.2078543 ,"lng":-71.0011385}}]; 
userLocation = {lat: 0 , lng: 0};
closestStation = 30;
minDistance = 0;
marker = [];
redLineProperties = {
	path: [],
	geodesic: true,
   	strokeColor:'#FF0000',
   	strokeOpacity: 1.0,
 	strokeWeight: 2
};
userLineProperties = {
	path: [],
	geodesic: true,
   	strokeColor:'#8D478B',
   	strokeOpacity: 1.0,
 	strokeWeight: 2
};


function initMap()
{
	debug("start","initMap"); //////////////////////////////// ----- !
	var myOptions = {
		zoom: 12,
		center: {"lat":42.3354945, "lng":-71.0565192},
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	};
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	initStationMarkers();
	addRedlinePath();
	getUserLocation();
	debug("end","initMap"); //////////////////////////////// ----- !
}

function initStationMarkers()
{
	debug("start","initStationMarkers"); //////////////////////////////// ----- !
//	var marker = [];
	for (var i = 0; i < stationData.length; i++){
		marker[i] = new google.maps.Marker({
			position: stationData[i].loc,
			name: 	  stationData[i].name,
			icon: 	 'stationIcon.png'
		});
		marker[i].setMap(map);
	}	
    debug("end","initStationMarkers"); //////////////////////////////// ----- !
}

function updateStationMarkers(){
	for (var i = 0; i < stationData.length; i++){
		if( i == closestStation){
			marker[i].setIcon('closestStationIcon.png');
		}else{
			marker[i].setIcon('stationIcon.png');
		}
	}
}

function addRedlinePath()
{
	debug("start","addRedlinePath"); //////////////////////////////// ----- !
	var alewifeToJFK   = [];
	var jfkToAshmont   = [];
	var jfkToBraintree = [];
	for( var i = 0 ; i < 13 ; i++ ){
		alewifeToJFK[i] = stationData[i].loc;
	}
	for( var i = 0 ; i < 5 ; i++ ){
		jfkToAshmont[i] = stationData[i+12].loc;
	}
	jfkToBraintree[0] = stationData[12].loc;
	for( var i = 1 ; i < 6 ; i++ ){
		jfkToBraintree[i] = stationData[i+16].loc;
	}
	redLineProperties.path = alewifeToJFK;
	var path1 = new google.maps.Polyline(
		redLineProperties
	);
	redLineProperties.path = jfkToAshmont;
	var path2 = new google.maps.Polyline(
		redLineProperties
	);
	redLineProperties.path = jfkToBraintree;
	var path3 = new google.maps.Polyline(
		redLineProperties
	);
	path1.setMap(map);
	path2.setMap(map);
	path3.setMap(map);
	debug("end","addRedlinePath"); //////////////////////////////// ----- !
}

function getUserLocation()
{
	debug("start","getUserLocation"); //////////////////////////////// ----- !
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			userLocation.lat = position.coords.latitude;
			userLocation.lng = position.coords.longitude;
			userMarker = new google.maps.Marker({
				position: userLocation,
				name: 	  "you",
				icon: 	 'userIcon.png'
			});
			userMarker.setMap(map);
			timeUpdate();
		});
	}else {
		alert("geolocation not supported by your browser.");
	}
	conLog( "lat: " +userLocation.lat+" lng: "+userLocation.lng);
	debug("end","getUserLocation"); //////////////////////////////// ----- !
}

function timeUpdate(){
	updateClosestStation();
	showClosestStation();
	updateStationMarkers();
}


function updateClosestStation()
{
	debug("start","updateClosestStation"); //////////////////////////////// ----- !
	var distance = 0;
	closestStation = 0;
	minDistance = distance = calcDist(stationData[0].loc,userLocation);
	for(var i = 1; i<stationData.length;i++){
		distance = calcDist(stationData[i].loc,userLocation);
		if(distance <= minDistance){
			minDistance = distance;
			closestStation = i;
		}
	}
	debug("start","updateClosestStation"); //////////////////////////////// ----- !
}


// in miles
function calcDist(p1,p2){
	//debug("start","calcDist"); //////////////////////////////// ----- !
	var LatLng1 = new google.maps.LatLng(p1.lat,p1.lng); // needed to make computeDistance work
	var LatLng2 = new google.maps.LatLng(p2.lat,p2.lng);
	//debug("end","calcDist"); //////////////////////////////// ----- !
	return (google.maps.geometry.spherical.computeDistanceBetween(LatLng1, LatLng2) / 1000)*0.621371;
}


function showClosestStation()
{
	debug("start","showClosestStation"); //////////////////////////////// ----- !
	userLineProperties.path = [ stationData[closestStation].loc , userLocation ];
	line2User = new google.maps.Polyline(userLineProperties);
	line2User.setMap(map);
	debug("end","showClosestStation"); //////////////////////////////// ----- !
}

/*
function s2mins(seconds)
{
	debug("start","secondsMinutes"); //////////////////////////////// ----- !
	return "" + seconds/60 + " m " + seconds%60 " s";
	debug("end","secondsMinutes"); //////////////////////////////// ----- !
}

function findAndShowClosestStation(){

}

function centerMapOnUser(){

}

function displayTrainInfo(stationNumber){

}*/
-->