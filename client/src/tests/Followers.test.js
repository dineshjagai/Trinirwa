import React from 'react';
import renderer from 'react-test-renderer';
import Followers from '../components/Followers';
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

test('Test Followers snapshot', () => {
  const component = renderer.create(<Followers />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test Followers content', async () => {
  const { getByText } = render(<Followers />);
  const titleBtn = screen.getByText('All followers', { selector: 'button' });
  expect(titleBtn).toBeInTheDocument();

  await act(async () => {
    await fireEvent.click(titleBtn);   
  });
  const closeBtn = screen.getByRole('button', { name : 'Close'});
  const second = screen.getAllByText('All followers');
  expect(second[1]).toBeInTheDocument();
  expect(screen.getByText('Followers')).toBeInTheDocument();
  
  await act(async () => {
    await fireEvent.click(closeBtn);   
  });
});
