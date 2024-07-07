import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
import { userFixture1 } from '__fixtures__/users';

import CompanyDetail from '../CompanyDetail';

describe('CompanyDetail', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<CompanyDetail company={userFixture1.company} />);
    await screen.findByTestId('company-detail');

    // ASSERT
    expect(screen.getByTestId('company-detail')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    render(<CompanyDetail />);
    await screen.findByTestId('company-detail-loader');

    // ASSERT
    expect(screen.getByTestId('company-detail-loader')).toBeDefined();
  });
});
