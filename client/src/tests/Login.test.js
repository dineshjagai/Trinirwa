import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Login from '../components/Login';

test('Test Login snapshot', () => {
  const component = renderer.create(<Login />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
