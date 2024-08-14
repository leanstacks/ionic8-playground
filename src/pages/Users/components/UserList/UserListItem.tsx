import { ComponentPropsWithRef, useRef, useState } from 'react';
import {
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  useIonRouter,
} from '@ionic/react';
import classNames from 'classnames';

import './UserListItem.scss';
import { BaseComponentProps } from 'common/components/types';
import { useToasts } from 'common/hooks/useToasts';
import { useProgress } from 'common/hooks/useProgress';
import { DismissButton } from 'common/components/Toast/Toast';
import { User } from 'common/models/user';
import Avatar from 'common/components/Icon/Avatar';
import Icon, { IconName } from 'common/components/Icon/Icon';
import UserDeleteAlert from '../UserDelete/UserDeleteAlert';

/**
 * Properties for the `UserListItem` component.
 * @param {User} user - A `User` object.
 * @see {@link BaseComponentProps}
 * @see {@link IonItem}
 */
interface UserListItemProps
  extends BaseComponentProps,
    Pick<ComponentPropsWithRef<typeof IonItem>, 'lines'> {
  user: User;
}

/**
 * The `UserListItem` component renders a single item in the list of
 * `User` objects. Uses `IonItem` to provide base functionality.
 *
 * When clicked, navigates to the user detail page.
 * @param {UserListItemProps} props - Component properties.
 * @returns JSX
 */
const UserListItem = ({ className, lines, testid, user }: UserListItemProps): JSX.Element => {
  const testIdentifier = testid ?? `list-item-user-${user.id}`;
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const { setProgress } = useProgress();
  const { createToast } = useToasts();
  const router = useIonRouter();
  const ionSlidingRef = useRef<HTMLIonItemSlidingElement>(null);

  const doEdit = () => {
    ionSlidingRef.current?.close();
    router.push(`/tabs/users/${user.id}/edit`);
  };

  return (
    <IonItemSliding
      ref={ionSlidingRef}
      className={classNames('list-item-user', className)}
      data-testid={testIdentifier}
    >
      <IonItem routerLink={`/tabs/users/${user.id}`} lines={lines} detail>
        <Avatar value={user.name} />
        <IonLabel>
          <div className="content-row primary">
            <div className="name" data-testid={`${testIdentifier}-name`}>
              {user.name}
            </div>
          </div>
          <div className="content-row secondary">
            <div>
              <Icon icon={IconName.Envelope} />
              <div data-testid={`${testIdentifier}-email`}>{user.email}</div>
            </div>
          </div>
        </IonLabel>
      </IonItem>

      <IonItemOptions>
        <IonItemOption onClick={() => doEdit()}>
          <Icon icon={IconName.PenToSquare} />
          Edit
        </IonItemOption>
        <IonItemOption color="danger" onClick={() => setShowConfirmDelete(true)}>
          <Icon icon={IconName.Trash} />
          Delete
        </IonItemOption>
      </IonItemOptions>

      <UserDeleteAlert
        isOpen={showConfirmDelete}
        isPending={(isPending) => setProgress(isPending, { color: 'danger' })}
        onCancel={() => setShowConfirmDelete(false)}
        onError={() => {
          setShowConfirmDelete(false);
          //TODO: handle delete user error
        }}
        onSuccess={() => {
          setShowConfirmDelete(false);
          createToast({
            buttons: [DismissButton],
            duration: 5000,
            message: `${user?.name} deleted`,
          });
        }}
        user={user}
      />
    </IonItemSliding>
  );
};

export default UserListItem;
