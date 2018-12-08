// Write a function that parses and evaluates an arithmetic string
// Ex. "1+2", "34-5*100", "10-20*30+40/50"
// Positive integers separated by +, -, * or /. No parentheses
// You must respect the order of operations: *, / take precedence over +, -
// Your solution should be capable of returning non-integer results "1+3/4" should return 1.75
// Do not use 'eval'
// You have 60 minutes. Good luck!

function parseArithmeticString(theString) {
  let numbers = theString.split(/[\+\-\*\/]+/).map(num => parseInt(num, 10));
  const operatorRegEx = /[\+\-\*\/]+/g;
  const operators = theString.match(operatorRegEx);

  // first remove the * and / (b/c of order of operations)
  operateAndUpdateArray(numbers, operators, ["*", "/"]);

  // now remove the + and -
  operateAndUpdateArray(numbers, operators, ["+", "-"]);

  return numbers[0];
}

function operateAndUpdateArray(numbers, operators, includedOperators) {
  let shouldContinue = true;

  while (shouldContinue) {
    shouldContinue = false;

    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      if (operator === includedOperators[0] || operator === includedOperators[1]) {
        // Grab the two numbers we're going to operate on.
        // Conveniently, the numbers we operate on are (i, i+1) in the numbers array.
        const numbersToOperateOn = numbers.slice(i, i+2);
        const result = performOperation(operator, numbersToOperateOn);
        numbers[i] = result;
        numbers.splice(i+1, 1);
        shouldContinue = true;
        operators.splice(i, 1);
        break;
      }
    }
  }
}

function performOperation(operator, numbers) {
  if (operator === "+") {
    return numbers[0] + numbers[1];
  } else if (operator === "-") {
    return numbers[0] - numbers[1];
  } else if (operator === "*") {
    return numbers[0] * numbers[1];
  } else if (operator === "/") {
    return numbers[0] / numbers[1];
  } else {
    return null;
  }
}

console.log(parseArithmeticString("10+20*40-77+18/375"))
