// BASIC MATH FUNCTIONS
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    let result;
    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '•':
            result = multiply(num1, num2);
            break;
        case '÷':
            result = divide(num1, num2);
            break;
    }
    return result;
}
// GET FUNCTIONS
function getNumber() {
    let number = '';
    while (!isNaN(operation[0]) || (operation[0] == '.')) {
        number+=operation.shift();
    }
    return +number;
}

function getOperator() {
    return operation.shift();
}

// PUSH FUNCTIONS
function pushNumber(number) {
    operation.push(number);
    console.log(`operation: ${operation} number: ${number}`)
    let i = -1;
    let keepGoing = true;
    while (keepGoing) {
        if (operation.length == -(i)) {
            keepGoing = false;
        } else if (!isNaN(operation.slice(i)[0]) || (operation.slice(i)[0] == '.')) {
            i--;
        } else {
            keepGoing = false;
        }
    }

    displayValues(operation.slice(i + 1).join(''));
}

function pushOperator(operator) {
    if (operators.includes(operation.slice(-1)[0])) {
        operation.pop();
    }
    
    operation.push(operator)
}

//DISPLAY FUNCTIONS
function displayValues(value) {
    display.textContent = value;
}

function clearDisplay() {
    operation = ['0'];
    display.textContent = operation[0];
 }

 function deleteEntry() {
     operation.pop();
     displayValues(operation.slice(1).join(''));
 }

const operators = ['+', '-', '•', '÷'];
let operation = ['0'];

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
const decimal = document.querySelector('#decimal');
const equals = document.querySelector('#equals-sign');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');

buttons.forEach(button => button.addEventListener('click', () => {
    if (button.className == 'number') {
        pushNumber(button.textContent);
    } else if (button.className == 'operator') {
        pushOperator(button.textContent);
    }
})
);

decimal.addEventListener('click', () => {
    operation.push('.');
    displayValues(operation.slice(1).join(''));
});

equals.addEventListener('click', () => {
    if (operators.includes(operation.slice(-1)[0])) {
        displayValues('ERROR');
    }
    
    let num1 = getNumber();
    let operator = getOperator();
    let num2 = getNumber();
    let result = operate(operator, num1, num2);
    while (operation.length) {
        num1 = result;
        operator = getOperator();
        num2 = getNumber();
        result = operate(operator, num1, num2)
    }

    operation.push(result);
    displayValues(result);
});

clear.addEventListener('click', () => clearDisplay());

backspace.addEventListener('click', () => deleteEntry());