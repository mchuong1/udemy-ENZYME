import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, checkProp } from '../test/testutil'
import Input from './Input'

const mockSetCurrentGuess = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initalState) => [initalState, mockSetCurrentGuess]
}));

const defaultProps = {
  secretWord: 'party'
}

const setup = (props={}) => {
  const setupProps = {...defaultProps, ...props}
  return shallow(<Input {...setupProps}/>)
}

beforeEach(() => {
  mockSetCurrentGuess.mockClear()
})

afterEach(() => {
  
})

test('does not throw warning with expected props', () => {
  checkProp(Input, defaultProps)
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
})