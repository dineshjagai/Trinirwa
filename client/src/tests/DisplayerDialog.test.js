import React from 'react';
import renderer from 'react-test-renderer';
import ScrollDialog from '../components/DisplayerDialog';
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { getFollowers } from '../components/Module';


test('Test DisplayerDialog snapshot', () => {
  const component = renderer.create(<ScrollDialog 
    title={'Title'}
    secondTitle={'title'}
  />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test DisplayerDialog Close content', async () => {
  const { getByText } = render(<ScrollDialog 
    title={'Title'}
    secondTitle={'second Title'}
    getFunction={getFollowers}
  />);
  const titleBtn = screen.getByText('Title', { selector: 'button' });
  expect(titleBtn).toBeInTheDocument();

  await act(async () => {
    await fireEvent.click(titleBtn);   
  });
  const closeBtn = screen.getByRole('button', { name : 'Close'});
  expect(screen.getByText('second Title')).toBeInTheDocument();
  await act(async () => {
    await fireEvent.click(closeBtn);   
  });
});
