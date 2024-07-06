import { render, screen } from 'test/test-utils';
import { describe, expect, it } from 'vitest';
import Header from '../Header';

describe('Header', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Header />);
    await screen.findByTestId('header-app');

    // ASSERT
    expect(screen.getByTestId('header-app')).toBeDefined();
  });
});
