import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react'
import CommentBox from '../components/CommentBox';
import '@testing-library/jest-dom';
//import { act } from 'react-dom/test-utils'

test('Test CommentBox labels', () => {
  const { getByRole } = render(<CommentBox handlers={jest.fn()}/>);
  expect(screen.getByRole('button', { name: 'Go live' })).toBeInTheDocument();
});