import './App.css';

import Congrats from './Congrats'
import GuessedWords from './GuessedWords'
import Input from './Input'

function App() {

  const success = false
  const secretWord = 'party'
  const guessedWord = [];

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={secretWord}/>
      <GuessedWords guessedWords={guessedWord} />
    </div>
  );
}

export default App;
