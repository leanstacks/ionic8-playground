import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import Icon from '../Icon';

describe('Icon', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Icon icon="building" />);
    await screen.findByTestId('icon');

    // ASSERT
    expect(screen.getByTestId('icon')).toBeDefined();
  });
});
