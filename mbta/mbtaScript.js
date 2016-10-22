<!--
function initMap()
{
	debug("start","initMap"); //////////////////////////////// ----- !
	var myOptions = {
		zoom: 12,
		center: {"lat":42.3354945, "lng":-71.0565192},
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	};
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	initStations();
	debug("end","initMap"); //////////////////////////////// ----- !
}

function initStations()
{
	debug("start","initStations"); //////////////////////////////// ----- !
 	var stations = stationData();

 	//addRedlinePath();
 	marker = [];
	for (var i = 0; i < stations.length; i++){
		marker[i] = new google.maps.Marker({
			position: stations[i].loc,
			name: 	  stations[i].name,
			icon: 	 'stationIcon.png'
		});
		marker[i].setMap(map);
	}
	addRedlinePath(stations);	
	console.log(dent+"testing?");
    debug("end","initStations"); //////////////////////////////// ----- !
}

function stationData(){ // just made to separate
	return [
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
	 {"name":"Braintree","loc":{"lat": 42.2078543 ,"lng":-71.0011385}}
	 ];
}

/*
	pathy = [stations[0].loc, stations[15].loc];
	var path1 = new google.maps.Polyline({
		path: pathy,
		geodesic: true,
    	strokeColor: '#FF0000',
    	strokeOpacity: 1.0,
    	strokeWeight: 2
	})
	path1.setMap(map);
*/

function addRedlinePath(stationData){
	debug("start","addRedlinePath"); //////////////////////////////// ----- !
	var lineProperties = {
		path: [],
		geodesic: true,
    	strokeColor:'#FF0000',
    	strokeOpacity: 1.0,
    	strokeWeight: 2
	};
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
	for( var i = 1 ; i < 5 ; i++ ){
		jfkToBraintree[i] = stationData[i+17].loc;
	}
	lineProperties.path = alewifeToJFK;
	var path1 = new google.maps.Polyline(
		lineProperties
	);
	lineProperties.path = jfkToAshmont;
	var path2 = new google.maps.Polyline(
		lineProperties
	);
	lineProperties.path = jfkToBraintree;
	var path3 = new google.maps.Polyline(
		lineProperties
	);
	path1.setMap(map);
	path2.setMap(map);
	path3.setMap(map);
	debug("end","addRedlinePath"); //////////////////////////////// ----- !
}

function getIcons(){
 	var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
 	return{
 		station : {
 			icon: iconBase + 'station.png'
 		},
 		user : {
 			icon: iconBase + 'user.png'
 		},
 		train : {
 			icon: iconBase + 'train.png'
 		}
 	};
}