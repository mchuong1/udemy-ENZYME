import PropTypes from 'prop-types'

const Input = ({ secretWord }) => {
  return (
    <div data-test="component-input">
      Input
    </div>
  )
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
}

export default Input;