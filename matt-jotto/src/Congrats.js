import PropTypes from 'prop-types'

const Congrats = (props) => {

  const congratsMessage = props.success 
                          ? <span data-test='congrats-message'>
                              Congratulations! You guessed the word
                            </span>
                          : ''

  return (
    <div data-test="component-congrats">
      { congratsMessage }
    </div>
  )
}

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
}

export default Congrats
