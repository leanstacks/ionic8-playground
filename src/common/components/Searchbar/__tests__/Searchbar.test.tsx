import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import Searchbar from '../Searchbar';

describe('Searchbar', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Searchbar />);
    await screen.findByTestId('ls-searchbar');

    // ASSERT
    expect(screen.getByTestId('ls-searchbar')).toBeDefined();
    expect(screen.getByTestId('ls-searchbar')).toHaveClass('ls-searchbar');
  });
});
