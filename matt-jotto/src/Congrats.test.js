import { shallow } from 'enzyme'

import Congrats from './Congrats'
import { findByTestAttr, checkProp } from '../test/testutil'

const defaultProps = { success: false }

const setup = (props={}) => {
  const setupProps = {...defaultProps, ...props}
  return shallow(<Congrats {...setupProps} />)
}

test('renders without error', ()=> {
  const wrapper = setup({success: false})
  const component = findByTestAttr(wrapper, 'component-congrats')
  expect(component.length).toBe(0)
})

// test('renders no text when `success` props is false',()=> {
//   const wrapper = setup({success: false})
//   const component = findByTestAttr(wrapper, 'component-congrats')
//   expect(component.text()).toBe("")
// })

test('renders non-empty congrats message when `success` props is true',()=> {
  const wrapper = setup({success:true})
  const message = findByTestAttr(wrapper, 'congrats-message')
  expect(message.text().length).not.toBe(0)
})

test('does not throw warning with expected props', () => {
  const expectedProps = {success: false}
  checkProp(Congrats, expectedProps);
})