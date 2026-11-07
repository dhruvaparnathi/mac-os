import React, { useState } from 'react';
import MacWindow from '../../components/common/MacWindow';
import { RiCalculatorFill } from '@remixicon/react';
import { soundManager } from '../../utils/sound';
import './calculator.scss';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputDigit = (digit) => {
    soundManager.playClick();
    if (waitingForNewValue) {
      setDisplay(String(digit));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    soundManager.playClick();
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    soundManager.playClick();
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const toggleSign = () => {
    soundManager.playClick();
    const val = parseFloat(display);
    setDisplay(String(-val));
  };

  const inputPercent = () => {
    soundManager.playClick();
    const val = parseFloat(display);
    setDisplay(String(val / 100));
  };

  const performOperation = (nextOp) => {
    soundManager.playClick();
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const currentValue = prevValue || 0;
      let newValue = currentValue;

      if (operation === '+') newValue = currentValue + inputValue;
      else if (operation === '-') newValue = currentValue - inputValue;
      else if (operation === '×') newValue = currentValue * inputValue;
      else if (operation === '÷') newValue = inputValue === 0 ? 'Error' : currentValue / inputValue;

      setPrevValue(typeof newValue === 'number' ? newValue : null);
      setDisplay(String(newValue));
    }

    setWaitingForNewValue(true);
    setOperation(nextOp);
  };

  return (
    <MacWindow
      windowId="calculator"
      title="Calculator"
      icon={RiCalculatorFill}
      defaultWidth={260}
      defaultHeight={380}
      resizable={false}
    >
      <div className="calculator-wrapper">
        <div className="calc-display">
          <span>{display}</span>
        </div>

        <div className="calc-keypad">
          <button className="calc-btn fn" onClick={clear}>
            {display !== '0' || prevValue !== null ? 'C' : 'AC'}
          </button>
          <button className="calc-btn fn" onClick={toggleSign}>
            ±
          </button>
          <button className="calc-btn fn" onClick={inputPercent}>
            %
          </button>
          <button
            className={`calc-btn op ${operation === '÷' ? 'active' : ''}`}
            onClick={() => performOperation('÷')}
          >
            ÷
          </button>

          <button className="calc-btn num" onClick={() => inputDigit(7)}>7</button>
          <button className="calc-btn num" onClick={() => inputDigit(8)}>8</button>
          <button className="calc-btn num" onClick={() => inputDigit(9)}>9</button>
          <button
            className={`calc-btn op ${operation === '×' ? 'active' : ''}`}
            onClick={() => performOperation('×')}
          >
            ×
          </button>

          <button className="calc-btn num" onClick={() => inputDigit(4)}>4</button>
          <button className="calc-btn num" onClick={() => inputDigit(5)}>5</button>
          <button className="calc-btn num" onClick={() => inputDigit(6)}>6</button>
          <button
            className={`calc-btn op ${operation === '-' ? 'active' : ''}`}
            onClick={() => performOperation('-')}
          >
            −
          </button>

          <button className="calc-btn num" onClick={() => inputDigit(1)}>1</button>
          <button className="calc-btn num" onClick={() => inputDigit(2)}>2</button>
          <button className="calc-btn num" onClick={() => inputDigit(3)}>3</button>
          <button
            className={`calc-btn op ${operation === '+' ? 'active' : ''}`}
            onClick={() => performOperation('+')}
          >
            +
          </button>

          <button className="calc-btn num zero" onClick={() => inputDigit(0)}>0</button>
          <button className="calc-btn num" onClick={inputDecimal}>.</button>
          <button className="calc-btn op equals" onClick={() => performOperation(null)}>=</button>
        </div>
      </div>
    </MacWindow>
  );
};

export default Calculator;

