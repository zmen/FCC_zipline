var userList = ['FreeCodeCamp','storbeck','terakilobyte','habathcx','RobotCaleb','thomasballinger','noobs2ninjas','MedryBW'];
var offlineList = [];
var onlineList = [];
initial();

function initial() {
	clearNodes('.content');	
	for(var i=0; i<userList.length; i++) {
		createLinks(userList[i]);
	}
}

// bind onclick functions
var allBtn = document.querySelectorAll('.allbtn')[0];
allBtn.onclick = function() {
	initial();
}
var offlineBtn = document.querySelectorAll('.offlinebtn')[0];
offlineBtn.onclick = function() {
	var len = offlineList.length;
	clearNodes('.content');
	for(var i=0; i<len; i++) {
		createLinks(offlineList[i]);
	}
};
var onlineBtn = document.querySelectorAll('.onlinebtn')[0];
onlineBtn.onclick = function() {
	var len = onlineList.length;
	clearNodes('.content');
	for(var i=0; i<len; i++) {
		createLinks(onlineList[i]);
	}	
}


// useful functions
function createLinks(user) {
	var fatherNode = document.querySelectorAll('.content')[0];
	var a = document.createElement('a');
	var por = document.createElement('div');
	var info = document.createElement('div');
	var status = document.createElement('div');
	var name = document.createElement('h2');
	var details = document.createElement('p');
	var pic = document.createElement('img');
	var statusIcon = document.createElement('img');

	a.setAttribute('href','#');
	a.setAttribute('id',user);
	a.setAttribute('href','http://twitch.tv/'+user);
	por.setAttribute('class','portrait');
	info.setAttribute('class','info');
	status.setAttribute('class','status');
	statusIcon.setAttribute('class','statusIcon');
	name.innerHTML = user;
	
	//for portrait img
	pic.setAttribute('class', 'minipic');
	var getPortrait = sendHTTPrequest(user, 'user');
	if(getPortrait.logo)
		pic.src = getPortrait.logo;
	else
		pic.src = "http://img1.2345.com/duoteimg/zixunImg/local/2011/05/19/1305774588258.png";
	por.appendChild(pic);

	//for status
	var getStream = sendHTTPrequest(user, 'stream');
	if(getStream.stream) {
		if(onlineList.indexOf(user) < 0)
			onlineList.push(user);
		details.innerHTML = getStream.stream.channel.status.slice(0,27)+'...';
		statusIcon.src = 'http://ww3.sinaimg.cn/mw690/71d73f5bgw1exibbjn0myj200w00w0ih.jpg';
	}
	else {
		if(offlineList.indexOf(user) < 0)
			offlineList.push(user);
		details.innerHTML = 'offline';
		statusIcon.src = 'http://ww3.sinaimg.cn/mw690/71d73f5bgw1exibbk1weaj200w00w0m3.jpg';
	}

	a.appendChild(por);
	a.appendChild(info);
	a.appendChild(status);
	info.appendChild(name);
	info.appendChild(details);
	fatherNode.appendChild(a);
	status.appendChild(statusIcon);
}

function clearNodes(target) {
	var targetNode = document.querySelectorAll(target)[0];
	var allChildren = targetNode.children;
	for(var i=allChildren.length-1; i>=0; i--) {
		allChildren[i].parentNode.removeChild(allChildren[i]);
	}
}	

function sendHTTPrequest(user, type) {
	var request = new window.XMLHttpRequest();
	var method = '';
	if(type == 'stream')
		method = 'https://api.twitch.tv/kraken/streams/';
	else
		method = 'https://api.twitch.tv/kraken/users/';
	request.open('get', method+user, false);
	request.send(null);
	var result = JSON.parse(request.responseText);
	return result;
};
