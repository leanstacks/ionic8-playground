import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
import LoaderSpinner from '../LoaderSpinner';

describe('LoaderSpinner', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<LoaderSpinner />);
    await screen.findByTestId('loader-spinner');

    // ASSERT
    expect(screen.getByTestId('loader-spinner')).toBeDefined();
  });
});
