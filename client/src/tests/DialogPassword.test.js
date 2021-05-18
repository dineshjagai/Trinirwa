import React from 'react';
import renderer from 'react-test-renderer';
import DialogPassword from '../components/DialogPassword';
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

test('Test DialogPassword snapshot', () => {
  const component = renderer.create(<DialogPassword />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test DialogPassword Cancel content', async () => {
  const { getByText } = render(<DialogPassword />);
  const deleteBtn = screen.getByText('Delete account', { selector: 'button' });
  expect(deleteBtn).toBeInTheDocument();

  await act(async () => {
    await fireEvent.click(deleteBtn);   
  });
  const cancelBtn = screen.getByText('Cancel', { selector: 'button' });
  expect(screen.getByText('Confirm account deletion')).toBeInTheDocument();
  await act(async () => {
    await fireEvent.click(cancelBtn);   
  });
});

test('Test DialogPassword Delete content', async () => {
  const { getByText } = render(<DialogPassword />);
  const deleteBtn = screen.getByText('Delete account', { selector: 'button' });
  expect(deleteBtn).toBeInTheDocument();

  await act(async () => {
    await fireEvent.click(deleteBtn);   
  });

  const delBtn = screen.getByText('Delete', { selector: 'button' });
  expect(screen.getByText('Confirm account deletion')).toBeInTheDocument();
  await act(async () => {
    await fireEvent.click(delBtn);   
  });
});
