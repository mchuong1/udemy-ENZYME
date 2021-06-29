import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';

import languageContext from './context/languageContext'
import Input from './Input';

// mock entire module for destructuring useState on import //////
// const mockSetCurrentGuess = jest.fn();
// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: (initialState) => [initialState, mockSetCurrentGuess]
// }))

const setup = ({success, language, secretWord}) => {
  language = language || 'en';
  success = success || false;
  secretWord = secretWord || 'party';

  return mount(
    <languageContext.Provider value={language}>
      <Input success={success} secretWord={secretWord}/>
    </languageContext.Provider>
  )
}

describe('languagePicker', () => {
  test('correctly renders submit button in english', ()=> {
    const wrapper = setup({language: 'en'})
    const button = findByTestAttr(wrapper, 'submit-button')
    expect(button.text()).toBe('Submit')
  })
  test('correctly renders submit button in emoji', ()=> {
    const wrapper = setup({language: 'emoji'})
    const button = findByTestAttr(wrapper, 'submit-button')
    expect(button.text()).toBe('🚀')
  })
})

describe('render', () => {
  describe('success is false', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({});
    })
    test('Input renders without error', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input');
      expect(inputComponent.length).toBe(1);
    });
    test('input box displays', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.exists()).toBe(true);
    });
    test('submit button displays', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.exists()).toBe(true);
    });
  });
  describe('success is true', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({success: true});
    })
    test('Input renders without error', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input');
      expect(inputComponent.length).toBe(1);
    });
    test('input box does not display', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.exists()).toBe(false);
    });
    test('submit button does not display', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.exists()).toBe(false);
    });
  });
});

test('does not throw warning with expected props', () => {
  checkProps(Input, { secretWord: 'party' });
})

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  let originalUseState;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = () => ["", mockSetCurrentGuess];
    wrapper = setup({});
  });
  afterEach(() => {
    React.useState = originalUseState;
  });
  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const mockEvent = { target: { value: 'train' } };

    inputBox.simulate("change", mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
  test('field is cleared upon submit button click', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const mockEvent = { target: { value: 'train' } };

    inputBox.simulate("change", mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
})
