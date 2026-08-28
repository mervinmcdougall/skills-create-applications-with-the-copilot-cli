const { calculate, main } = require('../calculator');

describe('calculate', () => {
  describe('basic operations', () => {
    test.each([
      [2, '+', 3, 5],
      [10, '-', 4, 6],
      [45, '*', 2, 90],
      [20, '/', 5, 4],
    ])('calculates %p %p %p as %p', (left, operator, right, expected) => {
      expect(calculate(left, operator, right)).toBe(expected);
    });
  });

  describe('edge cases', () => {
    test('handles negative and decimal operands', () => {
      expect(calculate(-2.5, '+', 1.5)).toBe(-1);
      expect(calculate(-8, '*', -2)).toBe(16);
      expect(calculate(7, '/', 2)).toBe(3.5);
    });

    test('allows a zero result', () => {
      expect(calculate(5, '-', 5)).toBe(0);
      expect(calculate(0, '*', 10)).toBe(0);
    });

    test('rejects division by zero', () => {
      expect(() => calculate(20, '/', 0)).toThrow('Cannot divide by zero.');
    });

    test('rejects unsupported operations', () => {
      expect(() => calculate(2, '%', 3)).toThrow(
        'Unsupported operation "%"',
      );
    });
  });
});

describe('main', () => {
  let logSpy;
  let errorSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('prints the result for valid CLI arguments', () => {
    expect(main(['2', '+', '3'])).toBe(0);
    expect(logSpy).toHaveBeenCalledWith(5);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  test('rejects a non-numeric operand', () => {
    expect(main(['not-a-number', '+', '3'])).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith(
      'Error: The first operand must be a finite number.',
    );
  });

  test('rejects a missing operand and prints usage', () => {
    expect(main(['2', '+'])).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith(
      'Usage: node src/calculator.js <number> <operator> <number>',
    );
  });

  test('reports division by zero through the CLI', () => {
    expect(main(['20', '/', '0'])).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith('Error: Cannot divide by zero.');
  });
});
