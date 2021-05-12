import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Friends from '../components/Friends';

test('Test Friends snapshot', () => {
  const component = renderer.create(<Friends />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
