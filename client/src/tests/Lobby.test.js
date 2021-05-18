import React from 'react';
import Lobby from '../live_stream/Lobby';
import { createMount } from '@material-ui/core/test-utils';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';


test('Test Lobby snapshot', () => {
  const handleS = () => {
      console.log('Room Change');
  };
  const handleR = () => {
      console.log('Room Change');
  };
  const component = createMount(<Lobby 
    username={'isimbib'}
    roomName={'First Name'}
    handleRoomNameChange={handleR}
    handleSubmit={handleS}
    connecting={true}
  />
  );
  expect(component).toMatchSnapshot();
});

test('Test Lobby find buttons', () => {
  const { getByRole, getByText } = render(<Lobby />);
  expect(screen.getByRole('button', { name: 'Join' })).toBeInTheDocument();
  expect(screen.getByText('Enter a room')).toBeInTheDocument();
});



