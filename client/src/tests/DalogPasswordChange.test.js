import React from 'react';
import renderer from 'react-test-renderer';
import DialogPasswordChange from '../components/DialogPasswordChange';

test('Test DialogPasswordChange snapshot', () => {
  const handle = (cid) => {
    if (cid) {
      console.log("owner");
    } else {
      console.log("HERE {id}");
    }
  };
  const component = renderer.create(<DialogPasswordChange />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
