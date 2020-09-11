function eval() {
  // Do not use eval!!!
  return;
}

function sum(firstNum, secondNum) {
  return (+firstNum) + (+secondNum);
}

function diff(firstNum, secondNum) {
  return (+firstNum) - (+secondNum);
}

function multiply(firstNum, secondNum) {
  return (+firstNum) * (+secondNum);
}

function divide(firstNum, secondNum) {
  if (+secondNum === 0) {
    throw 'TypeError: Division by zero.';
  }
  return (+firstNum) / (+secondNum);
}

function expressionCalculator(expr) {
  let arr = expr.replace(/\s/g, '').split(/(\D)/).filter(Boolean);

  let stack = 0;
  let paired = 0;
  let result;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '(') {
      paired++;
    }
    if (arr[i] === ')') {
      paired--;
    }
  }

  if (paired != 0) {
    throw 'ExpressionError: Brackets must be paired';
  }

  if (expr.match(/\(/g) != null) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] === '(') {

        for (let j = i + 1; j < arr.length; j++) {
          if (arr[j] === ')') {
            let simpleExpr = [];
            simpleExpr = arr.slice(i + 1, j)
            let temp = simpleCalc(simpleExpr);
            arr.splice(i, j - i + 1, temp);

            i = j;
            break;
          }
        }
      }
    }
  }

  function simpleCalc(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '*') {
        stack = multiply(arr[i - 1], arr[i + 1]);
        arr.splice(i - 1, 3, stack);
        i -= 1;
      }

      if (arr[i] === '/') {
        stack = divide(arr[i - 1], arr[i + 1]);
        arr.splice(i - 1, 3, stack);
        i -= 1;
      }
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '+') {
        stack = sum(arr[i - 1], arr[i + 1]);
        arr.splice(i - 1, 3, stack);
        i -= 1;
      }

      if (arr[i] === '-') {
        stack = diff(arr[i - 1], arr[i + 1]);
        arr.splice(i - 1, 3, stack);
        i -= 1;
      }
    }

    return arr[0];
  }

  result = simpleCalc(arr);

  return result;
}

module.exports = {
  expressionCalculator
}
