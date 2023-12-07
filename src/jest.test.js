import { it, expect } from 'vitest';
import {render, screen } from '@testing-library/react';
import App from './App';

it('renders welcome message', () => {
  render(<App />);
  const button = screen.getByText("Check In");
  expect(button).toBeInTheDocument();
});