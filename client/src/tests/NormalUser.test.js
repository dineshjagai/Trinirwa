import React from 'react';
import renderer from 'react-test-renderer';
import NormalUser from '../components/NormalUser';

test('Test NomralUser snapshot', () => {
  const component = renderer.create(<NormalUser />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
