import React from 'react'
import '../assets/styles/Calculator.css'

export default function Calculator() {

  const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitForSecondOperand: false,
    operator: null
  }

  const inputDigit = (digit) => {
    const { displayValue, waitForSecondOperand } = calculator

    if (waitForSecondOperand === true) {
      calculator.displayValue = digit
      calculator.waitForSecondOperand = false
    }

    else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit
    }
  }

  const inputDecimal = (dot) => {
    if (calculator.waitForSecondOperand === true) {
      calculator.displayValue = '0.'
      calculator.waitForSecondOperand = false
      return
    }

    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }

  const handleOperator = (nextOperator) => {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue)

    if (operator && calculator.waitForSecondOperand) {
      calculator.operator = nextOperator
      return
    }

    if (firstOperand === null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue
    }
    
    else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)

      calculator.displayValue = `${parseFloat(result.toFixed(7))}`
      calculator.firstOperand = result
    }

    calculator.waitForSecondOperand = true
    calculator.operator = nextOperator
  }

  const calculate = (firstOperand, secondOperand, operator) => {
    if (operator === '+') {
      return firstOperand + secondOperand
    }
    
    else if (operator === '-') {
      return firstOperand - secondOperand
    }
    
    else if (operator === '*') {
      return firstOperand * secondOperand
    }
    
    else if (operator === '/') {
      return firstOperand / secondOperand
    }

    return secondOperand
  }

  const resetCalculator = () => {
    calculator.displayValue = '0'
    calculator.firstOperand = null
    calculator.waitForSecondOperand = false
    calculator.operator = null
  }

  const updateDisplay = () => {
    const display = document.querySelector('.calculator-screen')
    display.value = calculator.displayValue
  }

  const handleClick = (e) => {
    if (!e.target.matches('button')) {
      return
    }

    const value = e.target.value

    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        handleOperator(value)
        break
      case '.':
        inputDecimal(value)
        break
      case 'all-clear':
        resetCalculator()
        break
      default:
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value)
        }
    }

    updateDisplay()
  }

  return (
    <div className='wrapper'>
      <div className='calculator'>
  
        <input type='text' className='calculator-screen' value='0' disabled />
  
        <div className='calculator-keys'>
  
          <button type='button' className='operator' value='+' onClick={handleClick}>+</button>
          <button type='button' className='operator' value='-' onClick={handleClick}>-</button>
          <button type='button' className='operator' value='*' onClick={handleClick}>&times;</button>
          <button type='button' className='operator' value='/' onClick={handleClick}>&divide;</button>
  
          <button type='button' value='7' onClick={handleClick}>7</button>
          <button type='button' value='8' onClick={handleClick}>8</button>
          <button type='button' value='9' onClick={handleClick}>9</button>
  
          <button type='button' value='4' onClick={handleClick}>4</button>
          <button type='button' value='5' onClick={handleClick}>5</button>
          <button type='button' value='6' onClick={handleClick}>6</button>
  
          <button type='button' value='1' onClick={handleClick}>1</button>
          <button type='button' value='2' onClick={handleClick}>2</button>
          <button type='button' value='3' onClick={handleClick}>3</button>
  
          <button type='button' value='0' onClick={handleClick}>0</button>
          <button type='button' className='decimal' value='.' onClick={handleClick}>.</button>
          <button type='button' className='all-clear' value='all-clear' onClick={handleClick}>AC</button>
  
          <button type='button' className='equal-sign operator' value='=' onClick={handleClick}>=</button>
  
        </div>
  
      </div>
    </div>
  )
}