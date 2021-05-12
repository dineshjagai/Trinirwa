import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Registration from '../components/Registration';

test('Test Regisration snapshot', () => {
  const component = renderer.create(<Registration />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
