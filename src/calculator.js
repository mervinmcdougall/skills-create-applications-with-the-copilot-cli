#!/usr/bin/env node

/**
 * Node.js CLI calculator supporting only the four basic math operations:
 * addition (+), subtraction (-), multiplication (*), and division (/).
 */

const OPERATIONS = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/': (left, right) => left / right,
};

function calculate(left, operator, right) {
  if (!Object.hasOwn(OPERATIONS, operator)) {
    throw new Error(`Unsupported operation "${operator}". Use +, -, *, or /.`);
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
  console.error('Operators: +  -  *  /');
}

function main(args) {
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

module.exports = { calculate, main };
