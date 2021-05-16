import React from 'react';
import renderer from 'react-test-renderer';
import Room from '../live_stream/Room';

test('Test Room snapshot', () => {
  const part = {
      'videoTracks': 1,
      'audioTracks': 1,
      'identity': 'isimbib',
  };
  const r = {
      'localParticipant': part,
  };
  const handle = () => {
      console.log("Logout");
  }
  const component = renderer.create(<Room 
    roomName={'First Room'}
    room={r}
    handleLogout={handle}
  />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
