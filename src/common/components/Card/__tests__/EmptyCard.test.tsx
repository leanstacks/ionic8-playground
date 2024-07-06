import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import EmptyCard from '../EmptyCard';

describe('EmptyCard', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<EmptyCard />);
    await screen.findByTestId('card-empty');

    // ASSERT
    expect(screen.getByTestId('card-empty')).toBeDefined();
  });
});
