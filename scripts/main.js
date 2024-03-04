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
let operatorPressed = false;
let equalPressed = false;
let chaining = false;

function roundToFour(num) {
  return Math.round((num + Number.EPSILON) * 10000) / 10000;
}

function operate(numA, operator, numB) {
  // Runs when equal sign is pressed.
  if (operator === "add") {
    return roundToFour(add(numA, numB));
  } else if (operator == "subtract") {
    return roundToFour(subtract(numA, numB));
  } else if (operator == "multiply") {
    return roundToFour(multiply(numA, numB));
  } else if (operator == "divide") {
    return roundToFour(divide(numA, numB));
  }
}

// NUMBER BUTTONS
const numbersButton = document.querySelectorAll('.numbers');
numbersButton.forEach(number => {
  number.addEventListener('click', () => {
    if (equalPressed && !operatorPressed) {
      clear(); // Clear calculator if pressing a number without chaining
    }
    if (chaining) { // If number is pressed during a chain:
      display.textContent = ""; // reset the value shown
      chaining = false;
    }
    if (!(number.id === "point" && display.textContent.includes("."))) {
      display.textContent += number.textContent; // Prevents multiple decimals
    }
    equalPressed = false;
    if (!operatorPressed) {
      numA = +display.textContent;
    } else {
      numB = +display.textContent;
    }
  })
});

// OPERATORS
const operatorsButton = document.querySelectorAll('.operators *');

function operatorOff() {
  operatorPressed = false;
  operatorsButton.forEach(operatorButton => {
    operatorButton.style.backgroundColor = "#EFEFEF";
  });
};

operatorsButton.forEach(operatorButton => {
  operatorButton.addEventListener('click', () => {
    if (numA != null) {
      display.textContent = "";
      if (operatorPressed && !equalPressed) { // when operations are being chained
        chaining = true;
        evaluate();
      }
      operatorOff(); // Just to reset colors if switching operator mid-calc
      operator = operatorButton.id;
      operatorPressed = true;
      operatorButton.style.backgroundColor = "darkgrey";
    }
  })
});

// EQUAL BUTTON
const equalButton = document.querySelector('#equal');

function evaluate() {
  numA = operate(numA, operator, numB) // numA becomes answer to prepare for chain ops
  display.textContent = numA;
  operatorOff();
}

equalButton.addEventListener('click', () => {
  if (operatorPressed && numB != null) {
    evaluate();
    equalPressed = true;
    chaining = false;
  }
});

// CLEAR BUTTON
const clearButton = document.querySelector("#clear");
function clear() {
  operatorOff();
  equalPressed = false;
  chaining = false;
  display.textContent = "";
  numA = null;
  numB = null;
  operator = null;
};
clearButton.addEventListener('click', clear);

function test() {
  console.log(numA);
  console.log(numB);
  console.log(operator);
  console.log("op pressed " + operatorPressed)
  console.log("equal pressed " + equalPressed)
  console.log("chaining? " + chaining)
}

