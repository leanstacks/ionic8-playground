import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import ErrorCard from '../ErrorCard';

describe('ErrorCard', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<ErrorCard />);
    await screen.findByTestId('card-error');

    // ASSERT
    expect(screen.getByTestId('card-error')).toBeDefined();
  });
});
