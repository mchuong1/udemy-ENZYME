import moxios from 'moxios'

import { storeFactory } from '../../test/testutil'
import { getSecretWord } from './'

// describe('correctGuess', () => {
//   test('returns an action with type `CORRECT_GUESS', () => {
//     const action = correctGuess();
//     expect(action).toStrictEqual({ type: actionTypes.CORRECT_GUESS });
//   })
// })

describe('getSecretWord', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(()=> {
    moxios.uninstall()
  })
  test('secretWord is returned', () => {
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'party'
      })
    })

    // update to test app in Redux / context sections
    return store.dispatch(getSecretWord())
      .then(() => {
        const secretWord = store.getState().secretWord;
        expect(secretWord).toBe('party')
      })
  })
})