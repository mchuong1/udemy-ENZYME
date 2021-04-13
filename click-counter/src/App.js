import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [count, setCount] = React.useState(0)
  const [showError, setShowError] = React.useState(false)

  const decrementCounter = () => {
    if(count !== 0) setCount(count - 1)
    else {
      setCount(0)
      setShowError(true)
    }
  }

  const incrementCounter = () => {
    setCount(count + 1)
    setShowError(false)
  }

  const errorMessage =  <h3 data-test='error-message'>Count can't go below zero</h3>

  return (
    <div data-test="component-app" className="App">
      <h1 data-test="counter-display">
        The counter is currently&nbsp;
        <span data-test='count'>{count}</span>
      </h1>
      <button 
      data-test="increment-button" 
      onClick={incrementCounter}>Increment counter</button>
      <button
      data-test="decrement-button"
      onClick={decrementCounter}>Decrement Counter
      </button>
      {showError ? errorMessage : ''}
    </div>
  );
}

export default App;