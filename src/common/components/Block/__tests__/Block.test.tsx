import { render, screen } from 'test/test-utils';
import { describe, expect, it } from 'vitest';
import Block from '../Block';

describe('Block', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Block />);
    await screen.findByTestId('block');

    // ASSERT
    expect(screen.getByTestId('block')).toBeDefined();
  });
});
