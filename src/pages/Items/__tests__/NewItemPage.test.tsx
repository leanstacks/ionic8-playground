import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
import NewItemPage from '../NewItemPage';

describe('NewItemPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<NewItemPage />);
    await screen.findByTestId('page-item-new');

    // ASSERT
    expect(screen.getByTestId('page-item-new')).toBeDefined();
  });
});
