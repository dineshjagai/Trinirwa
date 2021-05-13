import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Friend from '../components/Friend';

test('Test Friend snapshot', () => {
  const f = {
    'username' : 'isimbib',
    'profile_picture' :  'logo512.png',
  };
  const component = renderer.create(<Friend info={f}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
