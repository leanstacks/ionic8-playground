import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import LoaderSkeleton from '../LoaderSkeleton';

describe('LoaderSkeleton', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<LoaderSkeleton />);
    await screen.findByTestId('loader-skeleton');

    // ASSERT
    expect(screen.getByTestId('loader-skeleton')).toBeDefined();
  });
});
