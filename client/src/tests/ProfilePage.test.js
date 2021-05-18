import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react'
import ProfilePage from '../components/ProfilePage';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils'

test('Test ProfilePage snapshot', () => {
  const component = renderer.create(<ProfilePage 
    profile_picture="logo512.png" 
    username="arnaud"
    />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


 test('checks that the labels are there', async () => {
  const { getByLabelText, getByRole } = render(<ProfilePage />);
  expect(screen.getByText('Trinirwa Microblog')).toBeInTheDocument();
  expect(screen.getByText('Photo')).toBeInTheDocument();
  expect(screen.getByText('Friends')).toBeInTheDocument();
  expect(screen.getByText('Followers')).toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'Go live' })).toBeInTheDocument();
  expect(screen.getByLabelText("what's on your mind!!")).toBeInTheDocument();

  const input = screen.getByLabelText("what's on your mind!!");
  await act(async () => {
    fireEvent.change(input, { target: { value: 'Hey' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create post' }));  
  });
});

test('checks that interests get in', async () => {
  const { getByRole } = render(<ProfilePage />);
  const interestBtn = screen.getByRole('button', { name: 'Add interest' });
  expect(interestBtn).toBeInTheDocument();

  await fireEvent.click(interestBtn);  
  const  input = document.getElementById('interest');
  await fireEvent.change(input, { target: { value: 'computer' } });

  //add interest
  const addBtn = screen.getByRole('button', { name: 'Add' });
  expect(addBtn).toBeInTheDocument();
  await fireEvent.click(addBtn);
  // delete interest
  const entered = screen.getByText('computer');
  expect(entered).toBeInTheDocument();

  await fireEvent.click(entered);  
});

