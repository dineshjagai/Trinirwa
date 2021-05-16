import React from 'react';
import renderer from 'react-test-renderer';
import TweetsDisplayer from '../components/tweetDisplayer';

test('Test TweetsDisplayer snapshot', () => {
  const component = renderer.create(<TweetsDisplayer />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
