import { IonAlert } from '@ionic/react';
import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames';

import './UserDeleteAlert.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import { useDeleteUser } from 'pages/Users/api/useDeleteUser';

/**
 * Properties for the `UserDetailAlert` component.
 * @param {function} [isPending] - Optional. Function called when the delete
 * operation is in progress.
 * @param {function} [onCancel] - Optional. Function called when the `Cancel`
 * button is pressed.
 * @param {function} [onError] - Optional. Function called when the delete
 * operation results in an Error.
 * @param {function} [onSuccess] - Optional. Function called when the delete
 * operation completes successfully.
 * @param {User} user - The `User` to be deleted.
 * @see {@link BaseComponentProps}
 * @see {@link IonAlert}
 */
interface UserDeleteAlertProps
  extends BaseComponentProps,
    Pick<ComponentPropsWithoutRef<typeof IonAlert>, 'isOpen'> {
  isPending?: (isPending: boolean) => void;
  onCancel?: () => void;
  onError?: () => void;
  onSuccess?: () => void;
  user: User;
}

/**
 * The `UserDeleteAlert` component is a wrapper for `IonAlert`. Use the
 * `UserDeleteAlert` component to render an alert to confirm the deletion
 * of a `User`.
 * @param {UserDeleteAlertProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserDeleteAlert = ({
  className,
  isOpen,
  isPending,
  onCancel,
  onError,
  onSuccess,
  testid = 'alert-user-delete',
  user,
}: UserDeleteAlertProps): JSX.Element => {
  const { isPending: isDeleting, mutate: deleteUser } = useDeleteUser();

  const doDeleteUser = () => {
    isPending?.(true);
    deleteUser(
      { id: user.id },
      {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: () => {
          onError?.();
        },
        onSettled: () => {
          isPending?.(false);
        },
      },
    );
  };

  return (
    <IonAlert
      className={classNames('alert-user-delete', className)}
      data-testid={testid}
      buttons={[
        {
          handler: () => {
            onCancel?.();
          },
          htmlAttributes: {
            disabled: isDeleting,
            'data-testid': `${testid}-button-cancel`,
          },
          text: 'Cancel',
        },
        {
          handler: () => {
            doDeleteUser();
            return false;
          },
          htmlAttributes: { disabled: isDeleting, 'data-testid': `${testid}-button-delete` },
          text: 'Delete',
        },
      ]}
      header={isDeleting ? 'Deleting...' : 'Are you sure?'}
      isOpen={isOpen}
      message={
        isDeleting ? `Deleting ${user?.name} in progress.` : `Deleting ${user?.name} is permanent.`
      }
    />
  );
};

export default UserDeleteAlert;
