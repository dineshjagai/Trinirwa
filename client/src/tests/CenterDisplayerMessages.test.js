import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react'
import DisplayerMessages from '../components/CenterDisplayerMessages';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils'

test('Test CenterDisplayerMessages snapshot', async () => {
  const { getByRole } = render(<DisplayerMessages />);
  expect(screen.getByRole('button', { name: 'Photo' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Create post' })).toBeInTheDocument();
  
  const input = screen.getByLabelText("what's on your mind!!");
  fireEvent.change(input, { target: { value: 'Hello' } });
  await act(async () => {
    await fireEvent.click(screen.getByRole('button', { name: 'Create post' }));   
  });

});