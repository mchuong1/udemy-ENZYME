//recieve the success state as a prop

export default function Component(props) {

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