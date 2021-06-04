import { shallow, mount } from 'enzyme'
import { findByTestAttr } from '../test/testutil'
import App from './App';

//activate global mock to make sure getSecretWord doesn;t make network call
jest.mock('./actions')
import { getSecretWord as mockGetSecretWord } from './actions';

const setup = () => {
  // `useEffect` not called on `shallow`, use mount
  // [https://github.com/airbnb/enzyme/issues/2086]
  return mount(<App />)
}

test('renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent).toHaveLength(1)
});

describe('get secret word', () => {
  beforeEach(() => {
    // clear mock calls
    mockGetSecretWord.mockClear();
  })
  test('get secret word on app mount', () => {
    const wrapper = setup();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });
  test('getSecretWord does not run on app update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // using setProps because wrapper.update() doesn't trigger useEffect
    // https://hithub.com/enzymejs/enzyme/issues/2254
    wrapper.setProps();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
})