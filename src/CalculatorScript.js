//variables to track entered numbers and operators
var number1;
var operator;
var number2;
//save the calculated answer
var answer;
//booleans to track the current state of the program
var isFirstNumberDone = false;
var isNumberOperatorEntered = false;
var isCalculationComplete = false;
var isCommaEntered = false;
//used to calculate the decimal value of the entered number
var numberAfterComma = 1;

/*
Updates the display on the calculator with up to date information giving the user real time responses.
*/
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

/*
Called when a number is clicked on, updates the current number being worked on with the entered number

@parameter: the number that was clicked on
*/
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

/*
Called when the user clicks on the dot
Sets the state of the program to handle the next numbers entered as if they are decimals 
*/
function enterComma(){
	if(!isCommaEntered){
		isCommaEntered = true;
	}else{
		//todo
		//if comma is alrdy active do some animation to tell the user
	}
}

/*
Called when the user clicks on an operator
if the operator is '=' calculate the answer and display it
if any other operator is clicked set that operator as the calculations operator 
and set the programs state to start calculating the second number
*/
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

/*
Called when a operator button is pressed but the calculation already has a selected operator
turns the operator buttons red for a short while to indicate to the user that an invalid input was made
*/
function turnOpColorsRedAndBack(){
	//turn all op buttons red
		var buttons = document.getElementsByClassName("operator");
		for(let i = 0; i < buttons.length; i++){
			buttons[i].style.backgroundColor = "Crimson";
		}
		//turn them back after 200ms
		setTimeout(turnOpColorsBack, 200);
}
/*
turns the operator buttons color back to their original color
*/
function turnOpColorsBack(){
	var buttons = document.getElementsByClassName("operator");
	for(let i = 0; i < buttons.length; i++){
		buttons[i].style.backgroundColor = "Azure";
	}
}

/*
resets the state of the program and all variables so that the user can do a new calculation
*/
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