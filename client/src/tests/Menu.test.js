import React from 'react';
import renderer from 'react-test-renderer';
import Dropdown from '../components/Menu';

test('Test Menu snapshot', () => {
  const items = [1, 2, 3, 4];
  const component = renderer.create(<Dropdown menu={items}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
