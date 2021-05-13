import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Displayer from '../components/Displayer';

test('Test Displayer snapshot', () => {
  const interest = ['me', 'you'];

  const functOne = () => {
    console.log("Add interests!");
  }

  const functTwo = () => {
    console.log("Delete interests!");
  }


  const component = renderer.create(<Displayer interests={interest} 
  addInterest={functOne} deleteInterest={functTwo} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
