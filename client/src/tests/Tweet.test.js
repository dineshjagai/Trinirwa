import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Tweet from '../components/Tweet';

test('Test Tweet snapshot', () => {
  const component = renderer.create(<Tweet />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
