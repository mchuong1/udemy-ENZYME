import PropTypes from 'prop-types'

const Congrats = (props) => {
  const { success } = props;
  const congratsMessage = (<span data-test='congrats-message'>
                              Congratulations! You guessed the word
                            </span>)
                          

  return (
    success && 
    <div data-test="component-congrats" className="alert alert-success">
      { congratsMessage }
    </div>
  )
}

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
}

export default Congrats
