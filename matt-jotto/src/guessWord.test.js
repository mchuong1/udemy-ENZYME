import React from 'react'
import { mount } from 'enzyme'

import App from './App'
import { findByTestAttr, storeFactory } from '../test/testutil'
import { Provider } from 'react-redux'

//activate global mock to make sure getSecretWord doesn;t make network call
jest.mock('./actions')

const setup = (initialState = {}) => {

  //TODO: apply initialState
  const store = storeFactory(initialState)
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // add a value to input box
  const inputBox = findByTestAttr(wrapper, 'input-box')
  inputBox.simulate('change', { target: { value: 'train' } })
  
  //simulate click on submmit button
  const submitButton = findByTestAttr(wrapper, 'submit-button')
  submitButton.simulate('click', { preventDefault() {} })

  return wrapper;
}

// describe('invalid word guessed', () => {
//   test.todo('guessedWords table does not get another row')
// })

describe('no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: []
    })
  })
  test('creates a GuessedWords table with one row', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guessed-word')
    expect(guessedWordRows).toHaveLength(1)
  })
})

describe('some words have been guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }]
    })
  })
  test('GuessedWords table with 2 rows', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guessed-word')
    expect(guessedWordRows).toHaveLength(2)
  })
})

describe('guess secret word', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }]
    })
    const inputBox = findByTestAttr(wrapper, 'input-box')
    inputBox.simulate('change', { target: { value: 'party' } })

    const submitButton = findByTestAttr(wrapper, 'submit-button')
    submitButton.simulate('click', { preventDefault() {} })
  })
  test('GuessedWords table with 3 rows', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guessed-word')
    expect(guessedWordRows).toHaveLength(3)
  })
  test('inputbox should be hidden', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box')
    expect(inputBox.exists()).toBe(false)
  })
  test('submitButton should be hidden', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button')
    expect(submitButton.exists()).toBe(false)
  })
  test('congrats should be visible', () => {
    const congrats = findByTestAttr(wrapper, 'component-congrats')
    expect(congrats.text().length).toBeGreaterThan(0)
  })
})