import { ComponentPropsWithRef, useRef } from 'react';
import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  useIonRouter,
} from '@ionic/react';
import { create, mail } from 'ionicons/icons';
import classNames from 'classnames';

import './UserListItem.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import Avatar from 'common/components/Icon/Avatar';

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
  const router = useIonRouter();
  const ionSlidingRef = useRef<HTMLIonItemSlidingElement>(null);

  const doEdit = () => {
    ionSlidingRef.current?.close();
    router.push(`/tabs/users/${user.id}/edit`);
  };

  return (
    <IonItemSliding ref={ionSlidingRef} data-testid={testIdentifier}>
      <IonItem
        className={classNames('list-item-user', className)}
        routerLink={`/tabs/users/${user.id}`}
        lines={lines}
        detail
      >
        <Avatar value={user.name} />
        <IonLabel>
          <div className="content-row primary">
            <div className="name" data-testid={`${testIdentifier}-name`}>
              {user.name}
            </div>
          </div>
          <div className="content-row secondary">
            <div>
              <IonIcon icon={mail} />
              <div data-testid={`${testIdentifier}-email`}>{user.email}</div>
            </div>
          </div>
        </IonLabel>
      </IonItem>

      <IonItemOptions>
        <IonItemOption onClick={() => doEdit()}>
          <IonIcon icon={create} slot="start" />
          Edit
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default UserListItem;
