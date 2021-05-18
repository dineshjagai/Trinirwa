import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import Dropdown from '../components/Menu';
import { createMount } from '@material-ui/core/test-utils';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

test('Test Menu snapshot', () => {
  const items = [1, 2, 3, 4];
  const component = createMount(<Dropdown menu={items}/>);
  expect(component).toMatchSnapshot();
});

test('Test Menu items', () => {
  const items = ['a', 'b', 'c', 'd'];
  const { getByText } = render(<Dropdown menu={items}/>);
  expect(screen.getByText('a')).toBeInTheDocument();
});
