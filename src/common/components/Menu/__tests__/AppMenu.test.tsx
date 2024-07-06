import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
import AppMenu from '../AppMenu';

describe('AppMenu', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<AppMenu />);
    await screen.findByTestId('menu-app');

    // ASSERT
    expect(screen.getByTestId('menu-app')).toBeDefined();
  });
});
