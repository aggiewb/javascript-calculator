import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Display from './components/Display.js';
import Numbers from './components/Numbers.js';
import Operators from './components/Operators.js';
import Options from './components/Options.js'

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
const EXPECTED_INITIAL_STATE = {
  operation: '0',
  result: 0,
  hasResult: false
};

it('App deeply renders as a smoke test', () => {
  mount(<App />);
});

it('renders App class child components, and initializes their props', () => {
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

it('renders a Display component with a result set', () => {
  const EXPECTED_SET_RESULT = {
    result: 1,
    hasResult: true
  };
  const display = shallow(<Display hasResult={EXPECTED_SET_RESULT.hasResult} result={EXPECTED_SET_RESULT.result}/>);
  const input = display.find('input');
  expect(input.prop('value')).toEqual(EXPECTED_SET_RESULT.result);
});

it('renders a Display component with a result not set', () => {
  const display = shallow(<Display hasResult={EXPECTED_INITIAL_STATE.hasResult} operation={EXPECTED_INITIAL_STATE.operation}/>);
  const input = display.find('input');
  expect(input.prop('value')).toEqual(EXPECTED_INITIAL_STATE.operation);
});

it('renders a Numbers component with buttons for each number 0-9', () => {
  const numbers = shallow(<Numbers engNums={EXPECTED_ENGLISH_NUMBERS}/>);
  const buttons = numbers.find('button');
  expect(buttons).toHaveLength(EXPECTED_ENGLISH_NUMBERS.length);

  const numButtons = [];
  buttons.forEach(button => numButtons.push(button.prop('id')));
  EXPECTED_ENGLISH_NUMBERS.forEach(number => {
    expect(numButtons).toContain(number);
  });
});

it('calls method concatOperation() on click of a Numbers component button element', () => {
  const concatOperation = jest.fn();
  const numbers = shallow(<Numbers engNums={EXPECTED_ENGLISH_NUMBERS} concatOperation={concatOperation}/>);
  const oneButton = numbers.find('button').filter(`#${EXPECTED_ENGLISH_NUMBERS[1]}`);
  oneButton.simulate('click');
  expect(concatOperation).toHaveBeenCalled();
});

it('renders an Options component with buttons for each option', () => {
  const optionsKeys = Object.keys(EXPECTED_OPTIONS);
  const options = shallow(<Options options={EXPECTED_OPTIONS}/>);
  const buttons = options.find('button');
  expect(buttons).toHaveLength(optionsKeys.length);

  const optionsButtons = [];
  buttons.forEach(button => optionsButtons.push(button.prop('id')));
  optionsKeys.forEach(key => {
    expect(optionsButtons).toContain(key);
  });
});

it('calls method clear() on click of an Options component button element AC', () => {
  const clear = jest.fn();
  const options = shallow(<Options options={EXPECTED_OPTIONS} clear={clear}/>);
  const acButton = options.find('button').filter('#clear');
  acButton.simulate('click');
  expect(clear).toHaveBeenCalled();
});

it('calls method concatDecimal() on click of an Options component button element .', () => {
  const concatDecimal = jest.fn();
  const options = shallow(<Options options={EXPECTED_OPTIONS} concatDecimal={concatDecimal}/>);
  const decimalButton = options.find('button').filter('#decimal');
  decimalButton.simulate('click');
  expect(concatDecimal).toHaveBeenCalled();
});

it('calls method equals() on click of an Options component button element =', () => {
  const equals = jest.fn();
  const options = shallow(<Options options={EXPECTED_OPTIONS} equals={equals}/>);
  const equalsButton = options.find('button').filter('#equals');
  equalsButton.simulate('click');
  expect(equals).toHaveBeenCalled();
});

it('renders an Operators component with buttons for each operator +, -, /, and x', () => {
  const operatorsKeys = Object.keys(EXPECTED_OPERATORS);
  const operators = shallow(<Operators operators={EXPECTED_OPERATORS}/>);
  const buttons = operators.find('button');
  expect(buttons).toHaveLength(operatorsKeys.length);

  const operatorsButtons = [];
  buttons.forEach(button => operatorsButtons.push(button.prop('id')));
  operatorsKeys.forEach(key => {
    expect(operatorsButtons).toContain(key);
  });
});

it('calls method concatOperation() on click of an Operators component button element', () => {
  const concatOperation = jest.fn();
  const operators = shallow(<Operators operators={EXPECTED_OPERATORS} concatOperation={concatOperation}/>);
  const addButton = operators.find('button').filter('#add');
  addButton.simulate('click');
  expect(concatOperation).toHaveBeenCalled();
});

it('calls App class concatOperation() method passing in an event object with a textContent of an operator on initial state', () => {
  const app = shallow(<App />);
  app.setState({...EXPECTED_INITIAL_STATE});
  const event = {
    target: {
      textContent: EXPECTED_OPERATORS['add']
    }
  };
  app.instance().concatOperation(event);
  const display = app.find('Display');
  expect(display.prop('hasResult')).toEqual(EXPECTED_INITIAL_STATE.hasResult);
  expect(display.prop('operation')).toEqual(EXPECTED_INITIAL_STATE.operation);
});

it('calls App class concatOperation() method passing in an event object with a textContent of a number on initial state', () => {
  const app = shallow(<App />);
  const EXPECTED_OPERATION = '1';
  app.setState({...EXPECTED_INITIAL_STATE});
  const event = {
    target: {
      textContent: EXPECTED_OPERATION
    }
  };
  app.instance().concatOperation(event);
  const display = app.find('Display');
  expect(display.prop('hasResult')).toEqual(EXPECTED_INITIAL_STATE.hasResult);
  expect(display.prop('operation')).toEqual(EXPECTED_OPERATION);
});

it('calls App class concatOperation() method passing in an event object a textContent of a number with an operation has previous state set', () => {
  const app = shallow(<App />);
  const INITIAL_OPERATION = '1+';
  const EXPECTED_OPERATION = '2';
  app.setState({...EXPECTED_INITIAL_STATE, operation: INITIAL_OPERATION});
  const event = {
    target: {
      textContent: EXPECTED_OPERATION
    }
  };
  app.instance().concatOperation(event);
  const display = app.find('Display');
  expect(display.prop('hasResult')).toEqual(EXPECTED_INITIAL_STATE.hasResult);
  expect(display.prop('operation')).toEqual(INITIAL_OPERATION + EXPECTED_OPERATION);
});

it('calls App class method concatDecimal() with inital operation state value', () => {
  const app = shallow(<App />);
  app.setState({...EXPECTED_INITIAL_STATE});
  app.instance().concatDecimal();
  const display = app.find('Display');
  expect(display.prop('operation')).toEqual(EXPECTED_INITIAL_STATE.operation + '.');
});

it('calls App class method concatDecimal() with operation state value ending in an operator', () => {
  const app = shallow(<App />);
  const INITIAL_OPERATION = '1+'
  app.setState({...EXPECTED_INITIAL_STATE, operation: INITIAL_OPERATION});
  app.instance().concatDecimal();
  const display = app.find('Display');
  expect(display.prop('operation')).toEqual(INITIAL_OPERATION);
});

it('calls App class method concatDecimal() with operation state value ending in a number that contains a decimal', () => {
  const app = shallow(<App />);
  const INITIAL_OPERATION = '1.'
  app.setState({...EXPECTED_INITIAL_STATE, operation: INITIAL_OPERATION});
  app.instance().concatDecimal();
  const display = app.find('Display');
  expect(display.prop('operation')).toEqual(INITIAL_OPERATION);
});

it('calls App class method computeOperation() with inital operation state value', () => {
  const app = shallow(<App />);
  app.setState({...EXPECTED_INITIAL_STATE});
  app.instance().computeOperation();
  const display = app.find('Display');
  expect(display.prop('result')).toEqual(EXPECTED_INITIAL_STATE.result);
});

it('calls App class method computeOperation() with an operation that contains each operator +, -, /, and x', () => {
  const app = shallow(<App />);
  const INITIAL_OPERATION = '5+4-3x2/1';
  const EXPECTED_RESULT = 12;
  app.setState({...EXPECTED_INITIAL_STATE, operation: INITIAL_OPERATION});
  app.instance().computeOperation();
  const display = app.find('Display');
  expect(display.prop('result')).toEqual(EXPECTED_RESULT);
});

it('calls App class method clear() which sets display properties to initial values', () => {
  const app = shallow(<App />);
  app.instance().clear();
  const display = app.find('Display');
  expect(display.prop('hasResult')).toEqual(EXPECTED_INITIAL_STATE.hasResult);
  expect(display.prop('result')).toEqual(EXPECTED_INITIAL_STATE.result);
  expect(display.prop('operation')).toEqual(EXPECTED_INITIAL_STATE.operation);
});