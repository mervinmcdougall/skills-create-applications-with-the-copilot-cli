#!/usr/bin/env node

/**
 * Node.js CLI calculator supporting basic math operations:
 * addition (+), subtraction (-), multiplication (*), division (/),
 * modulo (%), exponentiation (**), and square root (sqrt).
 */

// Returns the remainder of a divided by b.
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Cannot calculate modulo by zero.');
  }

  return a % b;
}

// Returns base raised to the exponent.
function power(base, exponent) {
  return base ** exponent;
}

// Returns the square root of n and rejects negative numbers.
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot calculate the square root of a negative number.');
  }

  return Math.sqrt(n);
}

const OPERATIONS = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/': (left, right) => left / right,
  '%': modulo,
  '**': power,
};

function calculate(left, operator, right) {
  if (!Object.hasOwn(OPERATIONS, operator)) {
    throw new Error(
      `Unsupported operation "${operator}". Use +, -, *, /, or **.`,
    );
  }

  if (operator === '/' && right === 0) {
    throw new Error('Cannot divide by zero.');
  }

  return OPERATIONS[operator](left, right);
}

function parseNumber(value, name) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(`${name} must be a finite number.`);
  }

  return number;
}

function printUsage() {
  console.error('Usage: node src/calculator.js <number> <operator> <number>');
  console.error('Usage: node src/calculator.js <number> sqrt');
  console.error('Operators: +  -  *  /  %  **  sqrt');
}

function main(args) {
  if (args[1] === 'sqrt') {
    if (args.length !== 2) {
      printUsage();
      return 1;
    }

    try {
      console.log(squareRoot(parseNumber(args[0], 'The operand')));
      return 0;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return 1;
    }
  }

  if (args.length !== 3) {
    printUsage();
    return 1;
  }

  try {
    const left = parseNumber(args[0], 'The first operand');
    const result = calculate(left, args[1], parseNumber(args[2], 'The second operand'));
    console.log(result);
    return 0;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}

module.exports = { calculate, main, modulo, power, squareRoot };
