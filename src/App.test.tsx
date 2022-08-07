import React from 'react';
import { render, screen } from '@testing-library/react';
import CoinApp from './CoinApp';
import App from './App';

// ** CoinApp

// test('renders learn react link', () => {
//   render(<CoinApp />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});