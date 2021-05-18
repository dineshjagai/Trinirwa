import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { render, screen, fireEvent } from '@testing-library/react'
import MessagePage from '../components/MessagePage';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

test('Test MessagePage snapshot', () => {
  const component = createMount(<MessagePage />);
  expect(component).toMatchSnapshot();
});

test('Test CenterDisplayerMessages snapshot', async () => {
  const { getByRole } = render(<MessagePage />);
  expect(screen.getByRole('button', { name: 'Photo' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Create post' })).toBeInTheDocument();
  
  const input = screen.getByLabelText("what's on your mind!!");
  fireEvent.change(input, { target: { value: 'Hello' } });
  await act(async () => {
    await fireEvent.click(screen.getByRole('button', { name: 'Create post' }));   
  });

});
