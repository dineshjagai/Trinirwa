import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Home from '../components/Home';

test('Test Home snapshot', () => {
  const component = renderer.create(<Home />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
