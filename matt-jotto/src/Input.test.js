import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, checkProp } from '../test/testutil'
import Input from './Input'

const defaultProps = {

}

const setup = (props={}) => {
  const setupProps = {...defaultProps, ...props}
  return shallow(<Input {...setupProps}/>)
}


describe('Input Component', () => {
  test('renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-input')
    expect(component.length).toBe(1)
  })
})