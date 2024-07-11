import { describe, expect, it } from 'vitest';

import { render, screen, waitFor } from 'test/test-utils';
import { userFixture1 } from '__fixtures__/users';

import AddressDetail from '../AddressDetail';

describe('AddressDetail', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<AddressDetail address={userFixture1.address} />);
    await screen.findByTestId('address-detail');

    // ASSERT
    expect(screen.getByTestId('address-detail')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    render(<AddressDetail isLoading={true} />);
    await screen.findByTestId('address-detail-loader');

    // ASSERT
    expect(screen.getByTestId('address-detail-loader')).toBeDefined();
  });

  it('should render empty state', async () => {
    // ARRANGE
    const { container } = render(<AddressDetail />);
    await waitFor(() => expect(container).toBeDefined());

    // ASSERT
    expect(screen.queryByTestId('user-summary')).toBeNull();
  });
});
