var number1;
var operator;
var number2;
var answer;
var isFirstNumberDone = false;
var isNumberOperatorEntered = false;
var isCalculationComplete = false;
var isCommaEntered = false;
var numberAfterComma = 1;

function updateText(){
	if(isCalculationComplete){
		document.getElementById("outputText").innerHTML = number1 + " " + operator + " " + number2 + " = " + answer;
	}else if(number2 == null && operator == null && number1 == null){
		//do nothing
	}else if(number2 == null && operator == null){
		document.getElementById("outputText").innerHTML = number1;
	}else if(number2 == null){
		document.getElementById("outputText").innerHTML = number1 + " " + operator;
	}else{
		document.getElementById("outputText").innerHTML = number1 + " " + operator + " " + number2;
	}
}

function enterNumber(number){
	if(!isCalculationComplete){
		if(!isFirstNumberDone){
			if(isCommaEntered){
				if(number1 == null){
					number1 = number / Math.pow(10, numberAfterComma);
					updateText();
				}else{
					number1 = number1 + (number / Math.pow(10, numberAfterComma));
					updateText();
				}
				numberAfterComma++;
			}else{
				if(number1 == null){
					number1 = number;
					updateText();
				}else{
					number1 = (number1 * 10) + number;
					updateText();
				}
			}
		}else{
			if(isCommaEntered){
				if(number2 == null){
					number2 = number / Math.pow(10, numberAfterComma);
					updateText();
				}else{
					number2 = number2 + (number / Math.pow(10, numberAfterComma));
					updateText();
				}
				numberAfterComma++;
			}else{
				if(number2 == null){
					number2 = number;
					updateText();
				}else{
					number2 = (number2 * 10) + number;
					updateText();
				}
			}
		}
	}
}

function enterComma(){
	if(!isCommaEntered){
		isCommaEntered = true;
	}else{
		//if comma is alrdy active do some animation to tell the user
	}
}

function enterOperator(newOperator){
	if(newOperator == '=' && !isCalculationComplete){
		if(number1 == null || operator == null || number2 == null){
			return;
		}
		if(operator == "+"){
			answer = number1 + number2;
		}else if (operator == "-"){
			answer = number1 - number2;
		}else if (operator == "*"){
			answer = number1 * number2;
		}else if (operator == "/"){
			answer = number1 / number2;
		}
		isCalculationComplete = true;
		updateText();
		
	}else if(!isNumberOperatorEntered){
		if(newOperator == '+'){
			operator = "+";
		}else if(newOperator == '-'){
			operator = "-";
		}else if(newOperator == '*'){
			operator = "*";
		}else if(newOperator == '/'){
			operator = "/";
		}
		numberAfterComma = 1;
		isCommaEntered = false;
		isFirstNumberDone = true;
		isNumberOperatorEntered = true;
		updateText();
	}else if(!isCalculationComplete){
		//repeat operators should tell the user its doing something wrong
		turnOpColorsRedAndBack();
	}
	
}

//returns the original color to the operator buttons
function turnOpColorsRedAndBack(){
	//turn all op buttons red
		var buttons = document.getElementsByClassName("operator");
		for(let i = 0; i < buttons.length; i++){
			buttons[i].style.backgroundColor = "Crimson";
		}
		//turn them back after 200ms
		setTimeout(turnOpColorsBack, 200);
}
function turnOpColorsBack(){
	var buttons = document.getElementsByClassName("operator");
	for(let i = 0; i < buttons.length; i++){
		buttons[i].style.backgroundColor = "Azure";
	}
}

function reset(){
	number1 = null;
	number2 = null;
	operator = null;
	answer = null;
	numberAfterComma = 1;
	isFirstNumberDone = false;
	isNumberOperatorEntered = false;
	isCalculationComplete = false;
	isCommaEntered = false;
	document.getElementById("outputText").innerHTML = "Ready to be used!";
}