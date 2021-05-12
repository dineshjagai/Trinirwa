import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import ProfilePage from '../components/ProfilePage';

test('Test ProfilePage snapshot', () => {
  const component = renderer.create(<ProfilePage />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});