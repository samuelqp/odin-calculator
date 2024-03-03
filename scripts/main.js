const add = function(...args) {
  return args.reduce((sum, number) => sum + number);
};

const subtract = function(...args) {
  return args.reduce((difference, number) => difference - number);
};

const multiply = function(...args) {
  return args.reduce((product, number) => product * number, 1);
};

const divide = function(a, b) {
  return a / b;
};

const power = function(a, b) {
  return Math.pow(a, b);
};

const factorial = function(number) {
  if (number === 0 || number === 1) {
    return 1;
  } else if (number < 0) {
    return undefined;
  } else {
    return number * factorial(number - 1);
  }
};

let numA;
let operator;
let numB;
let display = document.querySelector('.result');
display.textContent = "69";

function operate(numA, operator, numB) {
  // Runs when equal sign is pressed.
  if (operator === "add") {
    return add(numA, numB);
  } else if (operator == "subtract") {
    return subtract(numA, numB);
  } else if (operator == "multiply") {
    return multiply(numA, numB);
  } else if (operator == "divide") {
    return divide(numA, numB);
  }
}

const numbers = document.querySelectorAll('.numbers');
numbers.forEach(number => {
  number.addEventListener('click', () => {
    display.textContent += number.textContent;
    if (!operatorPressed) {
      numA = display.textContent;
    } else {
      numB = display.textContent;
    }
  })
})
