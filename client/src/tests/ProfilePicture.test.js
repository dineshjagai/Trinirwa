import React from 'react';
import renderer from 'react-test-renderer';
import ProfilePicture from '../components/ProfilePicture';

test('Test ProfilePicture snapshot', () => {
  const d =  {
    'profile_picture' : 'logo512.png',
    'username' : 'isimbib',
  };
  const component = renderer.create(<ProfilePicture data={d} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
