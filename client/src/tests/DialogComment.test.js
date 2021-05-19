import React from 'react';
import renderer from 'react-test-renderer';
import DialogComment from '../components/DialogComment';

test('Test DialogComment snapshot', () => {
  const handle = (cid) => {
    if (cid) {
      console.log("owner");
    } else {
      console.log("HERE {id}");
    }
  };
  const component = renderer.create(<DialogComment id={1} content={'Hello!'} updatePost={handle}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


