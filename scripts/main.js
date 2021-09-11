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

function addItem(item) {
    operation.push(item);
}


let operation =[0];

const sum = document.querySelector('button#add');
sum.addEventListener('click', () => addItem(sum.textContent));
const difference = document.querySelector('#subtract');
difference.addEventListener('click', () => addItem(difference.textContent));
const product = document.querySelector('#multiply');
product.addEventListener('click', () => addItem(product.textContent));
const quotient = document.querySelector('#divide');
quotient.addEventListener('click', () => addItem(quotient.textContent));
const decimal = document.querySelector('#decimal');
decimal.addEventListener('click', () => addItem(decimal.textContent));
const equals = document.querySelector('#equals-sign');
equals.addEventListener('click', () => addItem(equals.textContent));
const numbers = document.querySelectorAll('.number');
numbers.forEach(number => number.addEventListener('click', () => addItem(number.textContent)));






