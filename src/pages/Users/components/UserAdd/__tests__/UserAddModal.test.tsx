import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { IonContent, IonPage } from '@ionic/react';
import { UseMutationResult } from '@tanstack/react-query';

import { render, screen, waitFor } from 'test/test-utils';
import { User } from 'common/models/user';
import * as UseCreateUser from 'pages/Users/api/useCreateUser';

import UserAddModal from '../UserAddModal';

describe('UserAddModal', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render successfully', async () => {
    // ARRANGE
    const mockSetIsOpen = vi.fn();
    render(<UserAddModal setIsOpen={mockSetIsOpen} testid="modal" />);
    await screen.findByTestId('modal');

    // ASSERT
    expect(screen.getByTestId('modal')).toBeDefined();
  });

  it.skip('should submit form', async () => {
    // ARRANGE
    const mockSetIsOpen = vi.fn();
    const mockCreateUser = vi.fn();
    const useCreateUserSpy = vi.spyOn(UseCreateUser, 'useCreateUser');
    useCreateUserSpy.mockReturnValueOnce({
      mutate: mockCreateUser,
    } as unknown as UseMutationResult<User, Error, UseCreateUser.CreateUserVariables>);
    render(<UserAddModal setIsOpen={mockSetIsOpen} isOpen={true} testid="modal" />);
    await screen.findByTestId('modal-form');

    // ACT
    // await userEvent.click(screen.getByTestId('modal-form-field-name'));
    await userEvent.type(screen.getByLabelText('Name'), 'test name');
    await userEvent.type(screen.getByLabelText('Username'), 'username455');
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Phone'), '1234567890');
    await userEvent.click(screen.getByTestId('modal-form-button-submit'));

    // ASSERT
    expect(screen.getByTestId('modal')).toBeDefined();
    expect(mockCreateUser).toHaveBeenCalled();
  });

  it.skip('should dismiss', async () => {
    // ARRANGE
    const mockSetIsOpen = vi.fn();
    render(
      <IonPage>
        <IonContent data-testid="content">
          <UserAddModal setIsOpen={mockSetIsOpen} isOpen={true} testid="modal" />
        </IonContent>
      </IonPage>,
    );
    await screen.findByTestId('modal-button-close');

    // ACT
    await userEvent.click(screen.getByTestId('modal-button-close'));
    await waitFor(() => expect(mockSetIsOpen).toHaveBeenCalled());

    // ASSERT
    expect(mockSetIsOpen).toHaveBeenCalled();
  });
});
