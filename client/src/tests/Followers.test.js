import React from 'react';
import renderer from 'react-test-renderer';
import Followers from '../components/Followers';

test('Test Followers snapshot', () => {
  const component = renderer.create(<Followers />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
