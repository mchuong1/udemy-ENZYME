import { actionTypes } from '../actions'

export default (state='', action) => {
  switch(action.type){
    case actionTypes.SET_SECRET_WORD:
      return action.payload;
    default:
      return state;
  }
}