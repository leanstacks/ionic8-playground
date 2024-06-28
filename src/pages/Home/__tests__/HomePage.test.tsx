import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomePage from '../HomePage';

describe('HomePage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<HomePage />);
    await screen.findByTestId('page-home');

    // ASSERT
    expect(screen.getByTestId('page-home')).toBeDefined();
  });
});
