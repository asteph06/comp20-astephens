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
stationNameToIndex = {};
for (var i = 0 ; i < stationData.length; i++) {
	var temp = stationData[i].name;
	stationNameToIndex[temp] = i;
}
for (var i = 0; i < stationData.length; i++) {
	stationData[i].trains = [];
	stationData[i].content = "";
}
windowOpenOnStation = "Alewife";

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


function initMap(){
	var myOptions = {
		zoom: 12,
		center: {"lat":42.3354945, "lng":-71.0565192},
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	};
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	initInfoWindow();
	initStationMarkers();
	initRedlinePath();
	initUserMarker();
	getUserLocation();
}

function initStationMarkers(){
	for (var i = 0; i < stationData.length; i++){
		var newPos = new google.maps.LatLng(stationData[i].loc.lat,stationData[i].loc.lng);
		marker[i] = new google.maps.Marker({
			position: newPos,
			name: 	  stationData[i].name,
			icon: 	 'stationIcon.png'
		});
		marker[i].addListener('click',function(){
			infoWindow.content = '<h3>loading</h3>';
			infoWindow.open(map,this);
			windowOpenOnStation = this.name;
			infoWindow.setContent(stationData[stationNameToIndex[this.name]].content);
			updateUserMarker()
			getIncomingTrains();
		});
		marker[i].setMap(map);
	}
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

function initInfoWindow(){
	infoWindow = new google.maps.InfoWindow({
		content: ""
	});
}

function initRedlinePath(){
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
}

function getUserLocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			userLocation.lat = position.coords.latitude;
			userLocation.lng = position.coords.longitude;
			updateUserMarker();
			return;
		});
	}else {
		alert("geolocation not supported by your browser.");
	}
}

function initUserMarker(){
	userMarker = new google.maps.Marker({
		position: userLocation,
		name: 	  "you",
		Icon: 	  'userIcon.png'
	});
	marker[i].addListener('click',function(){
		infoWindow.content = 'loading...';
		infoWindow.open(map,this);
		infoWindow.setContent(stationData[stationNameToIndex[this.name]].content);
		updateUserMarker()
		getIncomingTrains();
	});
	userMarker.setMap(map);
}

function updateUserMarker(){
	userMarker.setPosition(userLocation);
	updateClosestStation();
	showClosestStation();
	updateStationMarkers();
}

function updateClosestStation(){
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
	debug("end","updateClosestStation"); //////////////////////////////// ----- !//
}

// in miles
function calcDist(p1,p2){
	//debug("start","calcDist"); //////////////////////////////// ----- !
	var LatLng1 = new google.maps.LatLng(p1.lat,p1.lng); // needed to make computeDistance work
	var LatLng2 = new google.maps.LatLng(p2.lat,p2.lng);
	//debug("end","calcDist"); //////////////////////////////// ----- !
	return (google.maps.geometry.spherical.computeDistanceBetween(LatLng1, LatLng2) / 1000)*0.621371;//
}

function showClosestStation(){
	debug("start","showClosestStation"); //////////////////////////////// ----- !
	userLineProperties.path = [ stationData[closestStation].loc , userLocation ];
	line2User = new google.maps.Polyline(userLineProperties);
	line2User.setMap(map);
	debug("end","showClosestStation"); //////////////////////////////// ----- !//
}

function getIncomingTrains(){
	debug("start","getIncomingTrains"); //////////////////////////////// ----- !
	// piazza post "XML request" used as reference
	var raw;
	var data;
	var request = new XMLHttpRequest();
	request.open("get","https://rocky-taiga-26352.herokuapp.com/redline.json", true);
	request.onreadystatechange = function()
	{
		// 4 TEESTINGGGGGGG
		//console.log("ready state is " + request.readyState);
		// YEAAAAUHHHHH

		if(request.readyState == 4){
			if ( request.status == 200 ) {
				raw = request.responseText;
				data = JSON.parse(raw);
				updateStationData(data);
				debug("end","getIncomingTrains successful"); //////////////////////////////// ----- !
				infoWindow.setContent(stationData[stationNameToIndex[windowOpenOnStation]].content);
				return;
			}else{
				debug("end","getIncomingTrains UNSUCCESSFUL. TRYING AGAIN"); //////////////////////////////// ----- !
				getIncomingTrains();
			}
		}
	}
	request.send();
	debug("end","getIncomingTrains"); //////////////////////////////// ----- !//
}

function updateStationData(data){
	//debug("start","updateStationData"); //////////////////////////////// ----- !
	var stop = "";
	var time = 1;
	var destination = "";
	var next_train_index = 0;
	clearTrainData();
	for(var i =  0; i < data.TripList.Trips.length ; i++ ){
		var trip = data.TripList.Trips[i];
		destination =  trip.Destination;
		for (var k = 0 ; k < data.TripList.Trips[i].Predictions.length ; k++){
			stop = trip.Predictions[k].Stop;
			time = trip.Predictions[k].Seconds;
			next_train_index = stationData[stationNameToIndex[trip.Predictions[k].Stop]].trains.length;
			stationData[stationNameToIndex[stop]].trains[next_train_index] = addTrain(time,destination);
		}
	}
	for(var i=0;i<stationData.length;i++){
		var content = generateInfoWindowContent(i)
		stationData[i].content = content;
	}
	//debug("end","updateStationData"); //////////////////////////////// ----- !
}

function addTrain(arrivalTime,destination){
	//debug("start","addTrain"); //////////////////////////////// ----- !
	var newTrain = {
		'time': arrivalTime,
		'dest': destination
	};
	return newTrain;
	//debug("end","addTrain"); //////////////////////////////// ----- !//
}

// clears data from the trains
function clearTrainData(){
	for(var i = 0 ; i < stationData.length ; i++){
		stationData[i].trains = [];
	}
}

function generateInfoWindowContent(statNum){
	debug("start","generateInfoWindowContent"); //////////////////////////////// ----- !
	var station = stationData[statNum];
	var possDestinations = ["Ashmont","Braintree","Alewife"];
	var contentStr = '<div id="content" style="text-align: center; line-height: 5px;" >' +
	'<h3 id="stationName">' + station.name + '</h3>';
	for(var k = 0 ; k<possDestinations.length; k++){
		contentStr += '<h4 class = "destinationName" style="text-align: left;">' +
		possDestinations[k] + '</h4>';
		var atLeastOneTrainHeadingToDestination = false;
		for( var i = 0; i < station.trains.length ; i++ ){
			if( station.trains[i].dest == possDestinations[k] ){
				atLeastOneTrainHeadingToDestination = true;
				contentStr += "<p>   ";
				contentStr += s2mins(station.trains[i].time);
				contentStr += "</p>";
			}
		}
		if(!atLeastOneTrainHeadingToDestination){
			contentStr += '<p>  -no trains-  </p>';
		}
	}
	contentStr += '</div>';
	console.log(contentStr);
	return contentStr;
	debug("end","generateInfoWindowContent"); //////////////////////////////// ----- !////
}

// should be called just before train data is displayed.
function orderTrainTimes(num){
	debug("start","orderTrainTimes"); //////////////////////////////// ----- !
	var temp;
	var unordered = true;
	var station = stationData[num];
	while(unordered){
		unordered = false;
		for(var t=1; t<station.trains.length;t++){
			if(station.trains[t].time<station.trains[t-1].time){
				unordered = true;
				temp = station.trains[t-1];
				station.trains[t-1] = station.trains[t];
				station.trains[t] = temp;
			}
		}
	}
	debug("end","orderTrainTimes"); //////////////////////////////// ----- !//
}


function s2mins(seconds)
{
	debug("start","secondsMinutes"); //////////////////////////////// ----- !
	var min = Math.floor(seconds/60);
	var sec = seconds%60;
	var timey = "" + min + " m " + sec +" s";
	return timey;
	debug("end","secondsMinutes"); //////////////////////////////// ----- !//
}
/*
function findAndShowClosestStation(){

}

function centerMapOnUser(){

}

function displayTrainInfo(stationNumber){\

}*/
-->