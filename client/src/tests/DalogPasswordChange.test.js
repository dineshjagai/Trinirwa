import React from 'react';
import renderer from 'react-test-renderer';
import DialogPasswordChange from '../components/DialogPasswordChange';
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

test('Test DialogPasswordChange snapshot', () => {
  const handle = (cid) => {
    if (cid) {
      console.log("owner");
    } else {
      console.log("HERE {id}");
    }
  };
  const component = renderer.create(<DialogPasswordChange />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test DialogPasswordChange Cancel content', async () => {
  const { getByText } = render(<DialogPasswordChange />);
  const changeBtn = screen.getByText('Change password', { selector: 'button' });
  expect(changeBtn).toBeInTheDocument();

  await act(async () => {
    await fireEvent.click(changeBtn);   
  });
  const cancelBtn = screen.getByRole('button', { name : 'Cancel'});
  expect(screen.getByText('Old password')).toBeInTheDocument();
  await act(async () => {
    await fireEvent.click(cancelBtn);   
  });
});

test('Test DialogPasswordChange Update content', async () => {
  const { getByText } = render(<DialogPasswordChange />);
  const changeBtn = screen.getByText('Change password', { selector: 'button' });
  expect(changeBtn).toBeInTheDocument();

  await act(async () => {
    await fireEvent.click(changeBtn);   
  });
  const updateBtn = screen.getByRole('button', { name : 'Update'});
  expect(screen.getByText('Old password')).toBeInTheDocument();
  await act(async () => {
    await fireEvent.click(updateBtn);   
  });
});
