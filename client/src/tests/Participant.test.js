import React from 'react';
import renderer from 'react-test-renderer';
import Participant from '../live_stream/Participant';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('Test Participant snapshot', () => {
  const part = {
      'videoTracks': 1,
      'audioTracks': 1,
      'identity': 'isimbib',
  };
  const component = renderer.create(<Participant participant={part}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

