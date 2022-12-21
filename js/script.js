"use strict"

let curOperand = '';
let prevOperand = '';
let operation = null;
let shouldResetScreen = false;


const display = document.querySelector('.display');
const numbers = Array.from(document.querySelectorAll('.buttons > button.operand'));
const operations = Array.from(document.querySelectorAll('.buttons > button.operator'));
const equalsButton = document.querySelector('#equal');
const dotButton = document.querySelector('#dot');
const clearButton = document.querySelector('#clear');
const signButton = document.querySelector('#sign');

numbers.forEach(btn => 
  btn.addEventListener("click", () => setNumber(btn.textContent))
)

operations.forEach(btn => 
  btn.addEventListener("click", () => setOperation(btn.textContent))
)

equalsButton.addEventListener("click", evaluate);
dotButton.addEventListener("click", setPoint);
clearButton.addEventListener("click", resetAll);
signButton.addEventListener("click", changeSign);

const add = function(a, b) {
  return +a + +b;
};

const subtract = function(a, b) {
  return +a - +b;
};

const multiply = function(a, b) {
  return +a * +b;
};

const divide = function(a, b) {
  return (+a / +b);
};

const modulo = function(a, b) {
  return +a % +b;
}

function operate(a, b, operand) {
  if (operand == "+") {
    return add(a, b);
  } else if (operand == "-") {
    return subtract(a, b);
  } else if (operand == "*") {
    return multiply(a, b);
  } else if (operand == "/") {
    return divide(a, b);
  } else if (operand == "%") {
    return modulo(a, b);
  }
}

function roundNumber(number) {
  return Math.round(number * 100) / 100;
}

function resetScreen() {
  display.textContent = '';
  shouldResetScreen = false;
}

function setNumber(number) {
  if (display.textContent === '0' || shouldResetScreen) {
    resetScreen();
  }
  display.textContent += number;
}

function setOperation(operator) {
  if (operation !== null) {
    evaluate();
  } 
  prevOperand = display.textContent;
  operation = operator;
  shouldResetScreen = true;
}

function evaluate() {
  if (operation === null || shouldResetScreen) {
    return;
  } 
  curOperand = display.textContent;
  display.textContent = roundNumber(operate(prevOperand, curOperand, operation));
  operation = null;
};

function setPoint() {
  if (shouldResetScreen) {
    resetScreen();
  }
  if (display.textContent === '') {
    display.textContent = '0';
  }
  if (display.textContent.includes('.')) {
    return;
  } 
  display.textContent += '.';
}

function resetAll() {
  curOperand = '';
  prevOperand = '';
  operation = null;
  shouldResetScreen = false;
  display.textContent = '0';
}

function changeSign() {
  display.textContent = -(+display.textContent);
}