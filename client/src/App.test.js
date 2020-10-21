import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

//https://jestjs.io/docs/en/expect
//shallow: https://enzymejs.github.io/enzyme/docs/api/shallow.html
//mount: https://enzymejs.github.io/enzyme/docs/api/mount.html

const EXPECTED_ENGLISH_NUMBERS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const EXPECTED_OPTIONS = {
  clear: "AC",
  decimal: ".",
  equals: "="
};
const EXPECTED_OPERATORS = {
  add: "+",
  subtract: "-",
  multiply: "x",
  divide: "/"
};

it('App deeply renders as a smoke test', () => {
  mount(<App />);
});

it('renders App class child components, and initializes their props', () => {
  const EXPECTED_INITIAL_STATE = {
    operation: '0',
    result: 0,
    hasResult: false
  };
  const app = shallow(<App />);
  const display = app.find('Display');
  expect(display.exists()).toEqual(true);
  expect(display.prop('hasResult')).toEqual(EXPECTED_INITIAL_STATE.hasResult);
  expect(display.prop('result')).toEqual(EXPECTED_INITIAL_STATE.result);
  expect(display.prop('operation')).toEqual(EXPECTED_INITIAL_STATE.operation);

  const numbers = app.find('Numbers');
  expect(numbers.exists()).toEqual(true);
  expect(numbers.prop('engNums')).toEqual(EXPECTED_ENGLISH_NUMBERS);
  expect(numbers.prop('concatOperation')).toBeDefined();

  const options = app.find('Options');
  expect(options.exists()).toEqual(true);
  expect(options.prop('options')).toEqual(EXPECTED_OPTIONS);
  expect(options.prop('clear')).toBeDefined();
  expect(options.prop('concatDecimal')).toBeDefined();
  expect(options.prop('equals')).toBeDefined();

  const operators = app.find('Operators');
  expect(operators.exists()).toEqual(true);
  expect(operators.prop('operators')).toEqual(EXPECTED_OPERATORS);
  expect(operators.prop('concatOperation')).toBeDefined();

  const footer = app.find('Footer');
  expect(footer.exists()).toEqual(true);
});