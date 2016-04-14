function getRand(min,max){
	return Math.floor(Math.random()*(max-min+1))+min;
}

function isNum(num){
	if(typeof num === 'number'){
		return true;
	}else{
		return false;
	}
}
function sendAjax(){
	
}