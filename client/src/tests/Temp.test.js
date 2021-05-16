import React from 'react';
import renderer from 'react-test-renderer';
import Temp from '../components/Temp';

test('Test Temp snapshot', () => {
  const component = renderer.create(<Temp />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
