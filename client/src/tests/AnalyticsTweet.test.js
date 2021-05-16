import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react'
import DialogAnalytics from '../components/AnalyticsTweet';

test('Test AnalyticsTweet snapshot', () => {
  const component = renderer.create(<DialogAnalytics tweetId={1}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

 test('checks that the labels are there', () => {
      const { getByText } = render(<DialogAnalytics tweetId={1} />);
      getByText('Analytics');
  });
