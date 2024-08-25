import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import classNames from 'classnames';

import './AppMenu.scss';
import { BaseComponentProps } from '../types';
import { useAuth } from 'common/hooks/useAuth';
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import Avatar from '../Icon/Avatar';
import Icon, { IconName } from '../Icon/Icon';

/**
 * Properties for the `AppMenu` component.
 * @see {@link BaseComponentProps}
 */
interface AppMenuProps extends BaseComponentProps {}

/**
 * The `AppMenu` component renders the main application menu. Facilitates
 * navigation throughout the major sections of the application.
 * @param {AppMenuProps} props - Component properties.
 * @returns JSX
 */
const AppMenu = ({ className, testid = 'menu-app' }: AppMenuProps): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const { data: currentUser } = useGetCurrentUser();

  const showUserHeader = isAuthenticated && !!currentUser;

  return (
    <IonMenu
      className={classNames('menu-app', className)}
      contentId="content-main"
      data-testid={testid}
      menuId="menu-app"
      side="end"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle data-testid={`${testid}-title`}>
            {showUserHeader ? (
              <IonRow className="ion-align-items-center">
                <Avatar value={currentUser.name} size="default" />
                <div>{currentUser.name}</div>
              </IonRow>
            ) : (
              <>Menu</>
            )}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isAuthenticated && (
          <>
            <IonMenuToggle>
              <IonItem routerLink="/tabs/home" lines="full" data-testid={`${testid}-item-home`}>
                <Icon icon={IconName.House} fixedWidth className="icon" />
                <IonLabel>Home</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/tabs/users" lines="full" data-testid={`${testid}-item-users`}>
                <Icon icon={IconName.Users} fixedWidth className="icon" />
                <IonLabel>Users</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem
                routerLink="/tabs/account"
                lines="full"
                data-testid={`${testid}-item-account`}
              >
                <Icon icon={IconName.UserGear} fixedWidth className="icon" />
                <IonLabel>Account</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem
                routerLink="/auth/signout"
                lines="full"
                data-testid={`${testid}-item-signout`}
              >
                <Icon icon={IconName.SignOut} fixedWidth className="icon" />
                <IonLabel>Sign Out</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </>
        )}
      </IonContent>
    </IonMenu>
  );
};

export default AppMenu;
