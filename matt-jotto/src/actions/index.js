import axios from 'axios'

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
}

export const guessWord = (guessedWord) => {
  return function(dispatch, getState) {

  };
};

// Deprecated
// export const correctGuess = () => {
//   return { type: actionTypes.CORRECT_GUESS };
// } 

export const getSecretWord = () => {
  // TODO: write actual action in Redux / context section
  return axios.get('http://localhost:3030')
    .then(response => response.data)
}