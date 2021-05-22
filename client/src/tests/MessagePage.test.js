import React from 'react';
import renderer from 'react-test-renderer';
import MessagePage from '../components/MessagePage';

test('Test MessagePage snapshot', () => {
  const component = renderer.create(<MessagePage />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
