import {describe, expect, it} from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<App />);
    await screen.findByTestId('app');

    // ASSERT
    expect(screen.getByTestId('app')).toBeDefined();
  });
  
})
