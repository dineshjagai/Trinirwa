import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Follower from '../components/Follower';

test('Test Follower snapshot', () => {
  const i = {
      'username': 'isimbib',
      'profile_picture' : 'logo512.png',
  };
  const component = renderer.create(<Follower info={i}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
