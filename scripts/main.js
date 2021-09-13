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

function changeSign() {
    let i = displayValues();

    if (operation.slice(i)[0] == '+') {
        operation.splice(i, 1, '-');
    } else if (operation.slice(i)[0] == '-') {
        operation.splice(i, 1, '+');
    } else if (operation.slice(i)[0] == '0') {
        operation.splice(i, 1, '-');
    } else if (operation.slice(i)[0] == '×') {
        operation.splice(i + 1, 0, '-');
    } else {
        operation.splice(i, 0, '-');
    }

    displayValues();
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
        case '×':
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

    if (operation[0] == '-') {
        number+=operation.shift();
    }
    
    while (!isNaN(operation[0]) || (operation[0] == '.')) {
        number+=operation.shift();
    }

    return +number;
}

function getOperator() {
    if (operators.includes(operation[0])) {
        return operation.shift();
    }
}

// PUSH FUNCTIONS
function pushNumber(number) {
    if (operation[0] == '0') {
        operation.pop();
    }

    operation.push(number);
    displayValues(operation);
}

function pushOperator(operator) {
    if (operators.includes(operation.slice(-1)[0])) {
        operation.pop();
    }
    
    operation.push(operator)
    displayValues();
}

//DISPLAY FUNCTIONS
function displayValues() {
    let i = -1;
    let keepGoing = true;
    while (keepGoing) {
        if (operation.length == -(i)) {
            display.textContent = operation.slice(i).join('');
            keepGoing = false;
        } else if (!isNaN(operation.slice(i)[0]) || (operation.slice(i)[0] == '.')) {
            i--;
            display.textContent = operation.slice(i).join('');
        } else if (operators.includes(operation.slice(i)[0])) {
            display.textContent = operation.slice(i).join('');
            keepGoing = false;
        } else {
            display.textContent = operation.slice(i).join('');
            keepGoing = false;
        }
    }
    return i;
}

function clearDisplay() {
    operation = ['0'];
    display.textContent = operation[0];
 }

 function deleteEntry() {
     if (operation.length == 1) {
         displayValues();
     } else if (operation.length > 1) {
        operation.pop();
        displayValues();
     }
 }

const operators = ['+', '-', '×', '÷'];
let operation = ['0'];

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const decimal = document.querySelector('.decimal');
const equals = document.querySelector('.equals-sign');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');
const posneg = document.querySelector('.positive-negative');

buttons.forEach(button => button.addEventListener('click', () => {
    if (button.classList.contains('number')) {
        pushNumber(button.textContent);
    } else if (button.className == 'operator') {
        pushOperator(button.textContent);
    }
})
);

decimal.addEventListener('click', () => {
    let i = displayValues();

    let number = display.textContent;
    if (!number.includes('.')) {
        operation.push('.');
    }
    displayValues();
});

equals.addEventListener('click', () => {
    let num1 = getNumber();
    let operator = getOperator();
    /* evaluate operation if ordered correctly
    if user doesn't enter an operator, display the first number*/
    if (operator) {
        let num2 = getNumber();
        let result = operate(operator, num1, num2);
        while (operation.length) {
            num1 = result;
            operator = getOperator();
            num2 = getNumber();
            result = operate(operator, num1, num2);            
        }
        // need to separate negative sign from numeric value and push back to array
        // in case user continues calculations
        if (result < 0) {
            operation.push('-');
            operation.push(-result)
        } else {
            operation.push(result);
        }
        
        displayValues();
        
    } else {
        operation.push(num1);
    }
});

clear.addEventListener('click', () => clearDisplay());

backspace.addEventListener('click', () => deleteEntry());

posneg.addEventListener('click', () => changeSign() );
