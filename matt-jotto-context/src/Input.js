import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import languageContext from './context/languageContext'
import stringsModule from './helpers/strings'
function Input({ secretWord, success }) {
  const language = useContext(languageContext)
  const [currentGuess, setCurrentGuess] = React.useState("");

  if (success) {
    return <div data-test='component-input' />
  }

  return (
    <div data-test='component-input'>
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          onClick={(evt) => {
            evt.preventDefault();
            // TODO: update guessedWords
            // TODO: check against secretWord and update success if necessary
            setCurrentGuess("");
          }}
          className="btn btn-primary mb-2"
        >
        {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
