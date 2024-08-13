import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router';

import { render, screen } from 'test/test-utils';
import * as UseAuth from 'common/hooks/useAuth';

import PrivateOutlet from '../PrivateOutlet';

describe('PrivateOutlet', () => {
  const useAuthSpy = vi.spyOn(UseAuth, 'useAuth');

  beforeEach(() => {
    useAuthSpy.mockReturnValue({ isAuthenticated: true });
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(
      <PrivateOutlet>
        <div data-testid="page-private"></div>
      </PrivateOutlet>,
    );
    await screen.findByTestId('page-private');

    // ASSERT
    expect(screen.getByTestId('page-private')).toBeDefined();
  });

  it('should redirect when not authenticated', async () => {
    // ARRANGE
    useAuthSpy.mockReturnValueOnce({ isAuthenticated: false });
    render(
      <IonRouterOutlet>
        <Route path="/auth/signin" render={() => <div data-testid="page-signin"></div>} />
        <Route path="/" render={() => <PrivateOutlet></PrivateOutlet>} />
      </IonRouterOutlet>,
    );
    await screen.findByTestId('page-signin');

    // ASSERT
    expect(screen.getByTestId('page-signin')).toBeDefined();
  });
});
