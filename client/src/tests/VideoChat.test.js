import React from 'react';
import VideoChat from '../live_stream/VideoChat';
import { createMount } from '@material-ui/core/test-utils';

test('Test Menu snapshot', () => {
  const component = createMount(<VideoChat />);
  expect(component).toMatchSnapshot();
});

