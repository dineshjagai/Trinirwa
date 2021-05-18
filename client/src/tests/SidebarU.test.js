import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../components/SidebarU';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

//    beforeEach(() => {
// jest.mock('react-router-dom', () => ({
//      useHistory: () => ({
//         push: jest.fn(),
//      }),
//     }));
//     });

test('Test SidebarU snapshot', () => {
  const component = renderer.create(<Sidebar />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('Test SidebarU button', () => {
  const { getByRole } = render(<Sidebar />);
  const btn = document.getElementsByClassName('button_profile')[0];
  expect(btn).toBeInTheDocument();
});


