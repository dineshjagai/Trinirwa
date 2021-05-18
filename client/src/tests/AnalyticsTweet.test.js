import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react'
import DialogAnalytics from '../components/AnalyticsTweet';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils'

test('Test AnalyticsTweet snapshot', () => {
  const component = renderer.create(<DialogAnalytics tweetId={1}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

 test('checks that the labels are there', async () => {
      const { getByText } = render(<DialogAnalytics tweetId={1} />);
      expect(screen.getByText('Analytics')).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(screen.getByRole('button'));   
      });
      expect(screen.getByText('Tweet analytics')).toBeInTheDocument();
      expect(screen.getByText('Hiders')).toBeInTheDocument();

  });
