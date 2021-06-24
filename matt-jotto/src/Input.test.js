import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr, checkProp, storeFactory } from '../test/testutil'
import Input from './Input'
import { Provider } from 'react-redux'

const mockSetCurrentGuess = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initalState) => [initalState, mockSetCurrentGuess]
}));

const defaultProps = {
  secretWord: 'party',
}

const setup = (initialState={}, props={}) => {
  const setupProps = {...defaultProps, ...props}
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <Input {...setupProps}/>
    </Provider>
  )
}

beforeEach(() => {
  mockSetCurrentGuess.mockClear()
})

afterEach(() => {
  
})

test('does not throw warning with expected props', () => {
  checkProp(Input, defaultProps)
})

describe('render', () => {
  describe('success is true', () => {
    test('renders without error', () => {
      const wrapper = setup({success: true})
      const component = findByTestAttr(wrapper, 'component-input')
      expect(component.length).toBe(1)
    })
    test('input box does not show', () => {
      const wrapper = setup({success: true})
      const inputBox = findByTestAttr(wrapper, 'input-box')
      expect(inputBox.exists()).toBe(false)
    })
    test('submit button does not show', () => {
      const wrapper = setup({success: true})
      const submitButton = findByTestAttr(wrapper, 'submit-button')
      expect(submitButton.exists()).toBe(false)
    })
  })
  describe('success is false', () => {
    test('renders without error', () => {
      const wrapper = setup()
      const component = findByTestAttr(wrapper, 'component-input')
      expect(component.length).toBe(1)
    })
    test('input box does show', () => {
      const wrapper = setup()
      const inputBox = findByTestAttr(wrapper, 'input-box')
      expect(inputBox.exists()).toBe(true)
    })
    test('submit button does show', () => {
      const wrapper = setup()
      const submitButton = findByTestAttr(wrapper, 'submit-button')
      expect(submitButton.exists()).toBe(true)
    })
  })
})

describe('Input Component', () => {
  test('renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-input')
    expect(component.length).toBe(1)
  })
})

describe('state controlled input field', () => {
  test('state updates with value of input box upon change', () => {
    const wrapper = setup();
    const input = findByTestAttr(wrapper, 'input-box')
    
    const mockEvent = { target: { value: 'train' } }
    input.simulate('change', mockEvent)

    expect(mockSetCurrentGuess).toHaveBeenLastCalledWith('train')
  });

  test('field is cleared upon submit button click', ()=> {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'submit-button')

    button.simulate('click', { preventDefault() {} })
    expect(mockSetCurrentGuess).toBeCalledWith('');
  });
});