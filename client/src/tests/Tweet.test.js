import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react'
import Tweet from '../components/Tweet';
import '@testing-library/jest-dom';
//import { act } from 'react-dom/test-utils'

test('Test Tweet labels', () => {
  const d = {
    'user': 'isimbib',
    'tweet_id': 1,
    'type': 'text',
    'content': 'Hello there',
    'tweet_date': '2007-08-09',
  };
  const { getByText } = render(<Tweet data={d} handleDelete={jest.fn()}/>);
  expect(screen.getByText('isimbib')).toBeInTheDocument();
   expect(screen.getByText('Hello there')).toBeInTheDocument();
});