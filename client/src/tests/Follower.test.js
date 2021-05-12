import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Follower from '../components/Follower';

test('Test Follower snapshot', () => {
  const component = renderer.create(<Follower />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
