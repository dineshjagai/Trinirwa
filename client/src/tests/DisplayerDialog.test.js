import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import DisplayerDialog from '../components/DisplayerDialog';

test('Test DisplayerDialog snapshot', () => {
  const component = renderer.create(<DisplayerDialog />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
