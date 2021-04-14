import React from 'react'
import PropTypes from 'prop-types'

const GuessedWords = (props) => {
  const instructionMessage = props.guessedWords.length === 0
    ? <span data-test="guess-instructions">
      Try to guess the secret word!
      </span>
    : ''

  return(
    <div data-test='component-guessed-words'>
      {instructionMessage}
    </div>
  )
}

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired
    })
  ).isRequired
}

export default GuessedWords
