import React from 'react';
import renderer from 'react-test-renderer';
import Dialog from '../components/Dialog';

test('Test Dialog snapshot', () => {
  const component = renderer.create(<Dialog />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
