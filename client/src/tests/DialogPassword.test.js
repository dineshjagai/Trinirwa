import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import DialogPassword from '../components/DialogPassword';
import { render } from '@testing-library/react';

test('Test DialogPassword snapshot', () => {
  const component = renderer.create(<DialogPassword />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

