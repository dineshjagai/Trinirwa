import React from 'react';
import renderer from 'react-test-renderer';
import Lobby from '../live_stream/Lobby';

test('Test Lobby snapshot', () => {
  const handleS = () => {
      console.log('Room Change');
  };
  const handleR = () => {
      console.log('Room Change');
  };
  const component = renderer.create(<Lobby 
    username={'isimbib'}
    roomName={'First Name'}
    handleRoomNameChange={handleR}
    handleSubmit={handleS}
    connecting={true}
  />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
