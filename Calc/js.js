// Variables declare
var equation = document.getElementById('equation');
var result = document.getElementById('result');
var test = document.getElementsByTagName('button');
var input = '';
var output = 0;

// General event handle
var EventUtil = {

	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on"+type, handler);
		} else {
			element["on"+type] = handler;
		}
	},

	getEvent: function(event) {
		return event ? event: window.event;
	},

	getTarget: function(event) {
		return event.target || event.srcElement;
	},

	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on"+type, handler);
		} else {
			element["on"+type] = null;
		}
	}
};

// Add functions to all button
var initial = function(){
	
	/*
	 *@trimEx: avoid continue operators like "1-*+1"
	 *@trimHead: avoid operator at the beginning like "*1+1"
	 *@trimeEn: avoid extra operator at the end when taken to eval()
	 *@trimBrace: avoid num follows a brace like "Math.sqrt(1)1"
	 *@trim: for establish functions like "x2", "-/", "1/x" & "+/-"
	 */
	var trimEx = /[^\d\(\)]([^\d\(\)])$/g;
	var trimHe = /[^\d\(\)\w]*([\d]*.*[\d]+[^\d]*)/g; 
	var trimEn = /(.*[\d]+)[^\d\(\)]*/g; 
	var trimBrace = /(\))\d/;
	var trim = /([^\d]?)(\d+)$/g;

	for(var i=0;i<test.length;i++) 
		EventUtil.addHandler(test[i], 'click', function(){
			var val=this.firstChild.nodeValue;
			switch(val) {
				case 'C':
					output = '0';
					break;
				case 'CE':
					input = '0';
					break;
				case 'DEL':
					input = input.slice(0, input.length-1);
					break;
				case '=':
					input = input.replace(trimEn, '$1');
					output = eval(input);
					input = '';
					break;
				case '+/-':
					input = input.replace(trim, "$1(-$2)");
					break;
				case 'x2':
					input = input.replace(trim, "$1$2*$2");
					break;
				case '1/x':
					input = input.replace(trim, "$11/$2");
					break;
				case '_/':
					input = input.replace(trim, "$1Math.sqrt($2)");
					break;
				default:
					input += val;
					input = input.replace(trimEx, '$1')
								 .replace(trimHe,'$1')
								 .replace(trimBrace, '$1');
			}
			if(output>1e10) {
				result.firstChild.nodeValue = "Out of Range";
			} else {
				equation.firstChild.nodeValue = input;
				result.firstChild.nodeValue = output.toString().slice(0,15);
			}
		});
};

// Make the calc draggable
var DragDrop = function() {

	var dragging = null,
		diffX = 0,
		diffY = 0;

	function handleEvent(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		switch(event.type) {
			case "mousedown":
				if (target.className.indexOf("draggable")>-1) {
					dragging = target;
					diffX = event.clientX - target.offsetLeft;
					diffY = event.clientY - target.offsetTop;
				}
				break;

			case "mousemove":
				if (dragging != null) {
					dragging.style.left = (event.clientX - diffX) + "px";
					dragging.style.top = (event.clientY - diffY) + "px";
				}
				break;

			case "mouseup":
				dragging = null;
				break;
		}
	}

	return {
		enable: function() {
			EventUtil.addHandler(document, "mousedown", handleEvent);
			EventUtil.addHandler(document, "mousemove", handleEvent);
			EventUtil.addHandler(document, "mouseup", handleEvent);

		},
		disable: function() {
			EventUtil.removeHandler(document, "mousedown", handleEvent);
			EventUtil.removeHandler(document, "mousemove", handleEvent);
			EventUtil.removeHandler(document, "mouseup", handleEvent);
		}
	};
};

// Attch events
EventUtil.addHandler(window, "load", DragDrop().enable);
EventUtil.addHandler(window, "load", initial);