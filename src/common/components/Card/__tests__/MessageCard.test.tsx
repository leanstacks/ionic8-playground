import { render, screen } from 'test/test-utils';
import { describe, expect, it } from 'vitest';

import MessageCard from '../MessageCard';

describe('MessageCard', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<MessageCard />);
    await screen.findByTestId('card-message');

    // ASSERT
    expect(screen.getByTestId('card-message')).toBeDefined();
  });
});
