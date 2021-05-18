import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react'
import DisplayerTweets from '../components/CenterDisplay';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

test('Test CenterDisplay Create post buttons', async () => {
  const { getByRole } = render(<DisplayerTweets />);
  expect(screen.getByRole('button', { name: 'Go live' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Photo' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Video' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Song' })).toBeInTheDocument();

  const input = screen.getByLabelText("what's on your mind!!");
  fireEvent.change(input, { target: { value: 'Hello' } });
  await act(async () => {
    await fireEvent.click(screen.getByRole('button', { name: 'Create post' }));   
  });
});
