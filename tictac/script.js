var board = [0,0,0,0,0,0,0,0,0];
var win = [];

window.onload = function() {
	main();
}

function main() {
	var btns = document.querySelectorAll(".btn");
	for(var i=0; i<btns.length; i++) {
		btns[i].onclick = (function(index) {
			return function() {
				if(board[index] == 0) {
					board[index] = 1;
					this.setAttribute("class",   "activeO");
					linkArr();
					if(checkStatus()) {
						alert("player wins");
						reset(btns);
						return true;
					}
					console.log(board);
					if(isTie()) {
						alert("It is tie!");
						reset(btns);
						return true;
					}
					var next = bot();
					btns[next].setAttribute("class", "activeX");
					linkArr();
					if(checkStatus()) {
						alert("bot wins");
						reset(btns);
						return true;
					}
					if(isTie()) {
						alert("It is tie!");
						reset(btns);
						return true;
					}
				}
				return true;
			}
		})(i);
	}
}

function bot() {
	for(var i=0; i<9; i++) {
		if(board[i] == 0) {
			board[i] = 10;
			return i;
		}
	}

}

function reset(btns) {
	board = [0,0,0,0,0,0,0,0,0];
	win = [];
	for(var i=0; i<btns.length; i++) {
		btns[i].setAttribute("class","btn");
	}
	
}

function linkArr() {
	win[0] = board[0] + board[1] + board[2];
	win[1] = board[3] + board[4] + board[5];
	win[2] = board[6] + board[7] + board[8];
	win[3] = board[0] + board[4] + board[8];
	win[4] = board[2] + board[4] + board[6];
	win[5] = board[0] + board[3] + board[6];
	win[6] = board[1] + board[4] + board[7];
	win[7] = board[2] + board[5] + board[8];
}

function checkStatus() {
	for(var i=0; i<8; i++) {
		if(win[i] == 3 || win[i] == 30) {
			return true;
		}
	}
	return false;
}

function isTie() {
	for(var i=0; i<9; i++) {
		if(board[i] == 0)
			return false;
	}
	return true;
}
