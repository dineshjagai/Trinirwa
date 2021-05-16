import React from 'react';
import Lobby from '../live_stream/Lobby';
import { createMount } from '@material-ui/core/test-utils';


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
