import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import MessagePage from '../components/MessagePage';

test('Test MessagePage snapshot', () => {
  const component = createMount(<MessagePage />);
  expect(component).toMatchSnapshot();
});
