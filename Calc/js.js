var equation = document.getElementById('equation');
var result = document.getElementById('result');
var test = document.getElementsByTagName('button');
var input = '';
var output = 0;

initial();

function initial(){
	
	var trimEx = /[^\d]+([^\d])/g;
	var trimHe = /[^\d]*([\d]*.*[\d]+[^\d]*)/g;
	var trimEn = /(.*[\d]+)[^\d]*/g;

	for(var i=0;i<test.length;i++) {
		test[i].onclick = function(num){
			return function(){
				var val=test[num].firstChild.nodeValue;
				switch(val) {
					case 'C':
						output = '0';
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
					default:
						input += val;
						input = input.replace(trimEx, '$1').replace(trimHe,'$1');
				}
				if(output.toString().length>10)
					result.firstChild.nodeValue = "Out of Range";
				else {
					equation.firstChild.nodeValue = input;
					result.firstChild.nodeValue = output;
				}
			}
		}(i);
	}
}