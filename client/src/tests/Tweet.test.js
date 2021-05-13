import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Tweet from '../components/Tweet';

test('Test Tweet snapshot', () => {
  const d = {
    'user' : 'isimbib',
    'tweet_date' :  '2008-09-07',
    'content' : 'Hiii',
    'tweet_likes': 0,
    'tweet_id' :  1,
    'type' : 'text',
    'tweet_blocks': 0,
  };
  const component = renderer.create(<Tweet data={d}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
