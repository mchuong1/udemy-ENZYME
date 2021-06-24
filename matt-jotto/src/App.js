import { useEffect } from 'react'
import './App.css';

import Congrats from './Congrats'
import GuessedWords from './GuessedWords'
import Input from './Input'
import { getSecretWord } from './actions'
import { useSelector } from 'react-redux';

function App() {

  const success = useSelector( state => state.success);
  const secretWord = 'party'
  const guessedWords = useSelector( state => state.guessedWords);

  useEffect(() => {
    getSecretWord();
  }, []);

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input secretWord={secretWord}/>
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
}

export default App;
