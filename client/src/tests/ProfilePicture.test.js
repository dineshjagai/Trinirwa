import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import ProfilePicture from '../components/ProfilePicture';

test('Test ProfilePicture snapshot', () => {
  const component = renderer.create(<ProfilePicture />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
