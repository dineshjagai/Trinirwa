import React from 'react';
import renderer from 'react-test-renderer';
import CommentDisplayer from '../components/CommentDisplayer';

test('Test CommentDisplayer snapshot', () => {
  const d = {
    'user' : 'isimbib',
    'tweet_date' :  '2008-09-07',
    'content' : 'Hiii',
    'tweet_likes': 0,
    'tweet_id' :  '1',
    'type' : 'picture',
    'tweet_blocks': 0,
    'profile_picture': 'logo512.png',
    'comm_id': 3,
  };

  const handle = (id) => {
    if (id) {
      console.log("owner");
    } else {
      console.log("HERE {id}");
    }
  };
  const component = renderer.create(<CommentDisplayer data={d} handleDeleteComment={handle}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
