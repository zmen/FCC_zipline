function sendJsonpRequest(infos, url) {
	console.log("sendJsonpRequest runs");
	for(var attr in infos) {
		url = addURLParam(url, attr, infos[attr]);
	}
	url = addURLParam(url, "callback", "handleResponse");console.log(url);
	var script = document.createElement("script");
	script.src = url;

	// document.body.insertBefore(script, document.body.firstChild);
	document.body.appendChild(script);	
	document.body.removeChild(script);


}

function handleResponse(data) {
	console.log("callme");
	for(var i=0; i<10; i++) {
		var value = {
			"title": data.query.search[i].title,
			"snippet": data.query.search[i].snippet
		};
		appendLinks(value, content);
	}
}

function addURLParam(url, name ,value) {
	url += (url.indexOf("?") == -1? "?": "&");
	url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
	return url;
}

function appendLinks(value, parent) {
	var a = document.createElement("a");
	var h2 = document.createElement("h2");
	var p = document.createElement("p");
	h2.innerHTML = value.title;
	p.innerHTML = value.snippet;
	var enWiki = "https://en.wikipedia.org/wiki/" + value.title.replace(/\s/g, '_');
	a.setAttribute("href", enWiki);
	a.appendChild(h2);
	a.appendChild(p);
	parent.appendChild(a);
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
	"srsearch": "Main Page",
	"prop": "info",
	"format": "json"
};

var url = "https://en.wikipedia.org/w/api.php";
var btn = document.querySelectorAll(".searchBtn")[0];
var wrapper = document.querySelectorAll(".wrapper")[0];
var content = document.querySelectorAll(".content")[0];
var search = document.querySelectorAll(".search")[0];

btn.onclick = function() {
	clearNodes(".content");
	wrapper.setAttribute("class", "wrapperAfter");
	if(search.value) {
		infos.srsearch = search.value;
	}
	sendJsonpRequest(infos, url);console.log("what");
};

console.log("out");