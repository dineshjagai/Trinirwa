import React from 'react';
import renderer from 'react-test-renderer';
import VideoChat from '../live_stream/VideoChat';

test('Test VideoChat snapshot', () => {
  const component = renderer.create(<VideoChat />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
