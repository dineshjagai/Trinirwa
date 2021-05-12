import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Signup from '../components/Signup';

test('Test Signup snapshot', () => {
  const component = renderer.create(<Signup />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
