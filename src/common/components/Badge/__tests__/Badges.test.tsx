import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import Badges from '../Badges';

describe('Badges', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Badges>
        <div data-testid="child"></div>
      </Badges>,
    );
    await screen.findByTestId('badges');

    // ASSERT
    expect(screen.getByTestId('badges')).toBeDefined();
    expect(screen.getByTestId('badges')).toHaveClass('ls-badges');
    expect(screen.getByTestId('child')).toBeDefined();
  });
});
