import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react'
import Home from '../components/Home';
import '@testing-library/jest-dom';
//import { act } from 'react-dom/test-utils'

test('Test Home snapshot', () => {
  const { getByText } = render(<Home />);
  expect(screen.getByText('Trinirwa Microblog')).toBeInTheDocument();
});