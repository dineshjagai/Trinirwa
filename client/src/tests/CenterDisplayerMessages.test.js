import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react'
import DisplayerMessages from '../components/CenterDisplayerMessages';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils'

test('Test CenterDisplayerMessages create post', async () => {
  const { getByRole } = render(<DisplayerMessages />);
  expect(screen.getByRole('button', { name: 'Photo' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Create post' })).toBeInTheDocument();
  
  const input = screen.getByLabelText("what's on your mind!!");
  fireEvent.change(input, { target: { value: 'Hello' } });
  await act(async () => {
    await fireEvent.click(screen.getByRole('button', { name: 'Create post' }));   
  });
});

test('Test CenterDisplayerMessages post photo', async () => {
  const { getByRole } = render(<DisplayerMessages />);

  const input = screen.getByLabelText("what's on your mind!!");
  fireEvent.change(input, { target: { value: 'Hello' } });
  await act(async () => {
    await fireEvent.click(screen.getByRole('button', { name: 'Photo' }));   
  });
});

test('Test CenterDisplayerMessages post video', async () => {
  const { getByRole } = render(<DisplayerMessages />);

  const input = screen.getByLabelText("what's on your mind!!");
  fireEvent.change(input, { target: { value: 'Hello' } });
  await act(async () => {
    await fireEvent.click(screen.getByRole('button', { name: 'Video' }));   
  });
});

test('Test CenterDisplayerMessages post song', async () => {
  const { getByRole } = render(<DisplayerMessages />);

  const input = screen.getByLabelText("what's on your mind!!");
  fireEvent.change(input, { target: { value: 'Hello' } });
  await act(async () => {
    await fireEvent.click(screen.getByRole('button', { name: 'Song' }));   
  });
});