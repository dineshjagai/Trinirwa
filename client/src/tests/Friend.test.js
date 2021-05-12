import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Friend from '../components/Friend';

test('Test Friend snapshot', () => {
  const component = renderer.create(<Friend />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
