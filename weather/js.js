(function() {
	var currentlocation = getLocation();

	var city = currentlocation.city;
	var loc = currentlocation.loc.split(',');
	var lat = Math.floor(loc[0]);
	var lon = Math.floor(loc[1]);

	var allInfo = getWeather(lat, lon);
	var weather = allInfo.weather[0].description;
	var wind = allInfo.wind;
	var windDir = convertWindDirection(wind.deg);

	var domCity =  document.getElementById('cityLoc');
	var domWeather = document.getElementById('weather');
	var domWind = document.getElementById('wind');

	domCity.firstChild.nodeValue = city;
	domWeather.firstChild.nodeValue = weather;
	domWind.firstChild.nodeValue = windDir + ' ' + wind.speed;

	function getLocation() {
		var request = new window.XMLHttpRequest();
		request.open('get', 'http://ipinfo.io/json', false);
		request.send(null);
		var result = JSON.parse(request.responseText)
		return result;
	};
	
	function getWeather(lat, lon) {
		var APPID = '71984674e92be7d3417fa8cc21d69ef5';
		var website = 'http://api.openweathermap.org/data/2.5/weather?lat=@lat&lon=@lon&APPID=';
		website = website.replace('@lat', lat).replace('@lon', lon) + APPID;
		var w_request = new window.XMLHttpRequest();
		w_request.open('get',website, false);
		w_request.send(null);
		var result = JSON.parse(w_request.responseText);
		return result;
	}
	function convertWindDirection(dir) {
    	var rose = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    	var eightPoint = Math.floor(dir / 45);
    	return rose[eightPoint];
    }
})();