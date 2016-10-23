<!--
dent = "";

function debug(funcPlace,funcName)
{
	var tab  = "    ";
	var tabs = dent.length/tab.length;
	if(funcPlace == "start"){
		tabs = tabs + 1;
		funcPlace = funcPlace+"ing "
	}else if(funcPlace == "end"){
		tabs = tabs - 1;
		funcPlace = tab+funcPlace+"ing   ";
	}else{
		console.log("! -- initDent called incorrectly");
		return;
	}
	if(tabs < 0){
		console.log("! -- updateDent not called at start of a func");
		return;
	}
	dent = "";
	for(var i = 0; i<tabs; i++){
		dent += tab;
	}
	console.log( dent + funcPlace + "function: " + funcName);
	return;
}
function conLog(conMessage){
	console.log( dent + conMessage);
}
-->