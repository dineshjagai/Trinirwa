import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react'
import PrimarySearchAppBar from '../components/navBar';
import '@testing-library/jest-dom';
//import { act } from 'react-dom/test-utils'

test('Test navBar find buttons', () => {
  const { getByText } = render(<PrimarySearchAppBar />);
  expect(screen.getByText('Trinirwa Microblog')).toBeInTheDocument();
});