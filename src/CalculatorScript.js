var number1;
var operator;
var number2;
var answer;
var isFirstNumberDone = false;
var isNumberOperatorEntered = false;
var isCalculationComplete = false;
console.log("Script loaded");

function updateText(){
	console.log(operator);
	if(isCalculationComplete){
		document.getElementById("outputText").innerHTML = number1 + " " + operator + " " + number2 + " = " + answer;
	}else if(number2 == null && operator == null && number1 == null){
		//do nothing
		console.warning("Nothing to update text with");
	}else if(number2 == null && operator == null){
		document.getElementById("outputText").innerHTML = number1;
		console.log("Updating first number text");
	}else if(number2 == null){
		document.getElementById("outputText").innerHTML = number1 + " " + operator;
		console.log("Updating first number and operator text");
	}else{
		document.getElementById("outputText").innerHTML = number1 + " " + operator + " " + number2;
		console.log("Updating first number, operator and second number text");
	}
}

function enterNumber(number){
	if(!isCalculationComplete){
		if(!isFirstNumberDone){
			if(number1 == null){
				number1 = number;
				updateText(null);
				console.log("First number entered: " + number1);
			}else{
				number1 = (number1 * 10) + number;
				updateText(null);
				console.log("First number changed to: " + number1);
			}
		}else{
			if(number2 == null){
				number2 = number;
				updateText(operator);
				console.log("Second number entered: " + number2);
			}else{
				number2 = (number2 * 10) + number;
				updateText(operator);
				console.log("Second number changed to: " + number2);
			}
		}
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
		isFirstNumberDone = true;
		isNumberOperatorEntered = true;
		updateText();
		console.log(operator + " registered as main operator");
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