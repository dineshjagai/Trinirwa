import React from 'react';
import renderer from 'react-test-renderer';
import Message from '../components/Message';

test('Test Message snapshot', () => {
  const d = {
    'user' : 'isimbib',
    'message_date' :  '2008-09-07',
    'content' : 'Hiii',
    'tweet_likes': 0,
    'tweet_id' :  '1',
    'type' : 'picture',
    'tweet_blocks': 0,
  };
  const component = renderer.create(<Message data={d}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
