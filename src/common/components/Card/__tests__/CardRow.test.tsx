import { render, screen } from 'test/test-utils';
import { describe, expect, it } from 'vitest';

import CardRow from '../CardRow';

describe('CardRow', () => {
  it('should render successfully', async () => {
    // ASSERT
    render(<CardRow />);
    await screen.findByTestId('row-card');

    // ASSERT
    expect(screen.getByTestId('row-card')).toBeDefined();
  });
});
