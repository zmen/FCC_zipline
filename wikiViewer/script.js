// define JSONP and callback function
function sendJsonpRequest(infos, url) {

	for(var attr in infos) {
		url = addURLParam(url, attr, infos[attr]);
	}
	url = addURLParam(url, "callback", "handleResponse");
	var script = document.createElement("script");
	script.src = url;

	document.body.appendChild(script);	
	document.body.removeChild(script);
}

function handleResponse(data) {

	for(var i=0; i<infos.srlimit; i++) {
		var value = {
			"title": data.query.search[i].title,
			"snippet": data.query.search[i].snippet
		};
		appendLinks(value, content);
	}
}

// create search result
function appendLinks(value, parent) {

	var a = document.createElement("a");
	var h2 = document.createElement("h2");
	var p = document.createElement("p");
	var srTitle = value.title;
	var srPara = value.snippet + '...';

	// find match-str in title and pattern them
	// no need for srPara as Wiki Api has apply its own class to it
	srTitle = srTitle.replace(matchStr, function(str){
		return "<span class='matchText'>"+str+"</span>";
	    });

	h2.innerHTML = srTitle;
	p.innerHTML = srPara;

	var enWiki = "https://en.wikipedia.org/wiki/" + value.title.replace(/\s/g, '_');
	a.setAttribute("href", enWiki);
	a.appendChild(h2);
	parent.appendChild(a);
	parent.appendChild(p);
}

// some tools
function addURLParam(url, name ,value) {

	url += (url.indexOf("?") == -1? "?": "&");
	url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
	return url;
}

function clearNodes(target) {

	var targetNode = document.querySelectorAll(target)[0];
	var allChildren = targetNode.children;
	for(var i=allChildren.length-1; i>=0; i--) {
		allChildren[i].parentNode.removeChild(allChildren[i]);
	}
}

var infos = {
	"action": "query",
	"list": "search",
	"srsearch": "Search",
	"srlimit": 20,
	"prop": "info",
	"format": "json"
};

var url = "https://en.wikipedia.org/w/api.php",
	btn = document.querySelectorAll(".searchBtn")[0],
	wrapper = document.querySelectorAll(".wrapper")[0],
	content = document.querySelectorAll(".content")[0],
	search = document.querySelectorAll(".search")[0],
	body = document.getElementsByTagName("body")[0],
	matchStr = new RegExp();

btn.onclick = function(e) {
	e.preventDefault();
	clearNodes(".content");
	wrapper.setAttribute("class", "wrapperAfter");
	body.setAttribute("class", "bodyAfter");
	search.setAttribute("class", "");
	if(search.value) {
		infos.srsearch = search.value;
	}
	matchStr = new RegExp(infos.srsearch, "ig");
	sendJsonpRequest(infos, url);
};