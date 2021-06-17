import { useEffect } from 'react'
import './App.css';

import Congrats from './Congrats'
import GuessedWords from './GuessedWords'
import Input from './Input'
import { getSecretWord } from './actions'

function App() {

  const success = false
  const secretWord = 'party'
  const guessedWord = [];

  useEffect(() => {
    getSecretWord();
  }, []);

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input secretWord={secretWord}/>
      <GuessedWords guessedWords={guessedWord} />
    </div>
  );
}

export default App;
