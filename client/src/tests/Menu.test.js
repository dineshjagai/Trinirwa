import React from 'react';
import Dropdown from '../components/Menu';
import { createMount } from '@material-ui/core/test-utils';

test('Test Menu snapshot', () => {
  const items = [1, 2, 3, 4];
  const component = createMount(<Dropdown menu={items}/>);
  expect(component).toMatchSnapshot();
});
