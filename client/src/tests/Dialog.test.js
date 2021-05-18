import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react'
import Dialog from '../components/Dialog';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

test('Test Dialog snapshot', () => {
  const component = renderer.create(<Dialog />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test Dialog content', async () => {
  const { getByRole } = render(<Dialog />);
  expect(screen.getByRole('button', { name: 'Add interest' })).toBeInTheDocument();

  await act(async () => {
    await fireEvent.click(screen.getByRole('button', { name: 'Add interest' }));   
  });

  const interests = screen.getAllByText('Add interest');
  expect(interests[1]).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();

  // await act(async () => {
  //   await fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));   
  // });
});
