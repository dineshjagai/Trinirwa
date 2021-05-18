import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react'
import CommentDisplayer from '../components/CommentDisplayer';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

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

test('Test CommentDisplayer content', async () => {
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

  const { getByText } = render(<CommentDisplayer data={d} handleDeleteComment={handle}/>);
  expect(screen.getByText('isimbib')).toBeInTheDocument();

  await act(async () => {
    await fireEvent.click(screen.getByText('Edit', { selector: 'button' }));   
    await fireEvent.click(screen.getByText('Delete', { selector: 'button' }));   
  });
});


