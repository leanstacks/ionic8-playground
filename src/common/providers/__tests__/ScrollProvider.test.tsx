import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import ScrollProvider from '../ScrollProvider';

describe('ScrollProvider', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <ScrollProvider>
        <div data-testid="scroll-provider-children"></div>
      </ScrollProvider>,
    );
    await screen.findByTestId('scroll-provider-children');

    // ASSERT
    expect(screen.getByTestId('scroll-provider-children')).toBeDefined();
  });
});
