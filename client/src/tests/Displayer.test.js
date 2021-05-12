import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Displayer from '../components/Displayer';

test('Test Displayer snapshot', () => {
  const component = renderer.create(<Displayer />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
