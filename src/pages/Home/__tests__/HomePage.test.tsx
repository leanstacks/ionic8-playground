import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
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
