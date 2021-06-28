import { useEffect, useReducer, useState } from 'react';
import './App.css';

import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from './actions';

/**
 * @function reducer to update state, automatically called by dispatch
 * @param {object} state - previous state
 * @param {object} action - type and payload property
 * @return {object} - new state
 */
const reducer = (state, action) => {
  switch(action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload }
    default:
      throw new Error(`Invalid action type: ${action.type}`)
  }
}

function App() {
  // const [secretWord, setSecretWord] = useState('')

  const [state, dispatch] = useReducer(
    reducer,
    { secretWord: ''}
  )
  
  // TODO: get props from shared state
  const success = false;
  const guessedWords = [];

  const setSecretWord = (secretWord) => {
    dispatch({ type: 'setSecretWord', payload: secretWord})
  }

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, [])

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={state.secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
}

export default App;
