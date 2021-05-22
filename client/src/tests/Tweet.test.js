import React from 'react';
import renderer from 'react-test-renderer';
import Tweet from '../components/Tweet';

test('Test Tweet snapshot', () => {
  const d = {
    'user' : 'isimbib',
    'tweet_date' :  '2008-09-07',
    'content' : 'Hiii',
    'tweet_likes': 0,
    'tweet_id' :  '1',
    'type' : 'picture',
    'tweet_blocks': 0,
  };

  const handle = (id, owner) => {
    if (owner) {
      console.log("owner");
    } else {
      console.log("HERE {id}");
    }
  };
  const component = renderer.create(<Tweet data={d} handleDelete={handle}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
