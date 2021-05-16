import React from 'react';
import renderer from 'react-test-renderer';
import DisplayerTweets from '../components/CenterDisplay';

test('Test CenterDisplay snapshot', () => {
  const component = renderer.create(<DisplayerTweets />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});