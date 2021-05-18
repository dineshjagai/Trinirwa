import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react'
import CommentInput from '../components/CommentInput';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils'

test('Test CommentInput content', async () => {
  const { getByRole } = render(<CommentInput id={1} handleComment={jest.fn()}/>);
  expect(screen.getByRole('button', { name: 'Comment' })).toBeInTheDocument();

  const input = screen.getByLabelText("Comment on post");
  fireEvent.change(input, { target: { value: 'Hello' } });

  await act(async () => {
    await fireEvent.click(screen.getByRole('button', { name: 'Comment' }));   
  });

});