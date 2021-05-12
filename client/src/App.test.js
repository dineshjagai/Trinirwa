/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import App from './App';

test('Test App.js', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
