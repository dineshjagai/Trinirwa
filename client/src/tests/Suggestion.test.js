import React from 'react';
import renderer from 'react-test-renderer';
import Suggestions from '../components/Suggestion';

test('Test Temp snapshot', () => {
  const component = renderer.create(<Suggestions />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
