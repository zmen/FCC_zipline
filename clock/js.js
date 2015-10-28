function work() {
	var reset = document.getElementById('reset');
	var start = document.getElementById('start');
	var dec = document.getElementById('dec');
	var inc = document.getElementById('inc');

	var screen = document.getElementById('screen');
	var current = 1500;
	var originTime = 1560;
	var interval = 300;
	var stopId = 0;

	reset.onclick = function() {
		screen.firstChild.nodeValue = convertToMinutes(originTime);
		current = originTime;
		stopId = 1;
	}
	dec.onclick = function() {
		current -= interval;
		screen.firstChild.nodeValue = convertToMinutes(current);
	}
	inc.onclick = function() {
		current += interval;
		screen.firstChild.nodeValue = convertToMinutes(current);
	}

	start.onclick = function() {
		stopId = 0;
		function flow() {
			current -= 1;
			if(current > 0) {				
				var stopTime = setTimeout(flow, 1000);
				if(stopId == 1) {
					clearTimeout(stopTime);	
					current += 1;							
				}
			}
			screen.firstChild.nodeValue = convertToMinutes(current);
		}
		setTimeout(flow, 1000);
	}

	function convertToMinutes(seconds){
		var minutes = (seconds / 60) >> 0;
		var rest = seconds % 60;
		if(minutes<10)
			minutes = '0'+minutes;
		if(rest<10)
			rest = '0'+rest;
		return minutes + ':' + rest;
	}
}

window.onload = function() {
	work();
}