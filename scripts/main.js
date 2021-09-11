// BASIC CALCULATOR FUNCTIONS
function add(num1, num2) {
    return num1 * num2;
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

// ARRAY OF OPERATIONS
function addItem(item) {
    operation.push(item);
    
    if (!isNaN(item)) {
        displayValues(item);
    }
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            add(num1, num2);
            break;
        case '-':
            subtract(num1, num2);
            break;
        case '•':
            multiply(num1, num2);
            break;
        case '÷':
            divide(num1, num2);
            break;
    }
}

function displayValues(value) {
    const display = document.querySelector('#display');
    display.textContent = value;
}

let operation =[0];

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', () => addItem(button.textContent)));


