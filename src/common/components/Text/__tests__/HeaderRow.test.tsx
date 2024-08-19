import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import HeaderRow from '../HeaderRow';

describe('HeaderRow', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<HeaderRow />);
    await screen.findByTestId('row-header');

    // ASSERT
    expect(screen.getByTestId('row-header')).toBeDefined();
  });
});
