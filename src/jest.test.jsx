
import {it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react'
import { StyledButton } from './components/common/StyledButton.js';

describe('App', () => {
  it('renders headline', () => {
     render(<StyledButton>Check In</StyledButton>);

     const button = screen.getByText("Check In");

     console.log(button)
     expect(button).toHaveStyle(`color: #5AD07A;`);
  });
});