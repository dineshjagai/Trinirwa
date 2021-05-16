import React from 'react';
import renderer from 'react-test-renderer';
import DialogAnalytics from '../components/AnalyticsTweet';

test('Test AnalyticsTweet snapshot', () => {
  const component = renderer.create(<DialogAnalytics tweetId={1}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
