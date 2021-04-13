import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />)

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`)

test('renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
})

test('renders increment button', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'increment-button')
  expect(button.length).toBe(1)
})

test('renders counter display', () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.length).toBe(1)
})

test('counter display starts at 0', () => {
  const wrapper = setup()
  const count = findByTestAttr(wrapper, 'count').text()
  expect(count).toBe("0")
})

test('clicking increment button increments counter display', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'increment-button')
  
  button.simulate('click')
  
  const count = findByTestAttr(wrapper, 'count').text()
  expect(count).toBe("1")
})

test('renders decrement button', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'decrement-button')

  expect(button.length).toBe(1)
})

test('clicking decrement button will decrease counter display', () => {
  const wrapper = setup()
  const incrementButton = findByTestAttr(wrapper, 'increment-button')
  const decrementButton = findByTestAttr(wrapper, 'decrement-button')

  incrementButton.simulate('click')

  const count = findByTestAttr(wrapper, 'count').text()
  expect(count).toBe("1")

  setTimeout(()=> {
    decrementButton.simulate('click')
    const count2 = findByTestAttr(wrapper, 'count').text()
    expect(count2).toBe("0")
  }, 2000)
})

test('clicking decrement button on 0 will stay 0', ()=> {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'decrement-button')
  button.simulate('click')
  const count = findByTestAttr(wrapper, 'count').text()
  expect(count).toBe("0")
})

test('error message does not load on initial render', ()=> {
  const wrapper = setup()
  const error = findByTestAttr(wrapper, 'error-message')

  expect(error.length).toBe(0)
})

test('clicking decrement button on 0 will render error message', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'decrement-button')
  const error = findByTestAttr(wrapper, 'error-message')
  expect(error.length).toBe(0)

  button.simulate('click')

  const count = findByTestAttr(wrapper, 'count').text()
  const error2 = findByTestAttr(wrapper, 'error-message')
  expect(count).toBe("0")
  expect(error2.length).toBe(1)
})

test('error message goes away on increment', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'decrement-button')
  const error = findByTestAttr(wrapper, 'error-message')
  expect(error.length).toBe(0)
  
  button.simulate('click')

  const count = findByTestAttr(wrapper, 'count').text()
  const error2 = findByTestAttr(wrapper, 'error-message')
  expect(count).toBe("0")
  expect(error2.length).toBe(1)

  const incrementButton = findByTestAttr(wrapper, 'increment-button')
  incrementButton.simulate('click')
  const error3 = findByTestAttr(wrapper, 'error-message')
  expect(error3.length).toBe(0)
})