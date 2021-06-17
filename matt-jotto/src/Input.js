import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Input = ({ secretWord }) => {

  const [currentGuess, setCurrentGuess] = useState("");
  const success = useSelector(state => state.success)

  const handleSubmit = (event) => {
    setCurrentGuess('')
    event.preventDefault()

    // TODO: update guessedwords
    //TODO: check against secretWord and update success if needed
  }
  if (success){ 
    return <div data-test="component-input" />
  }
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="enter guess"
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={handleSubmit}
          >
          Submit
        </button>
      </form>
    </div>
  )
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
}

export default Input;