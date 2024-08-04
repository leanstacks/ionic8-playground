import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonProgressBar,
  useIonRouter,
} from '@ionic/react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { create, trash } from 'ionicons/icons';
import classNames from 'classnames';

import './UserDetailPage.scss';
import { PropsWithTestId } from 'common/components/types';
import { useGetUser } from 'pages/Users/api/useGetUser';
import { useToasts } from 'common/hooks/useToasts';
import { DismissButton } from 'common/components/Toast/Toast';
import Header from 'common/components/Header/Header';
import UserDetail from './UserDetail';
import Container from 'common/components/Content/Container';
import PageHeader from 'common/components/Content/PageHeader';
import Avatar from 'common/components/Icon/Avatar';
import UserDeleteAlert from '../UserDelete/UserDeleteAlert';

/**
 * Properties for the `UserDetailPage` component.
 * @see {@link PropsWithTestId}
 */
interface UserDetailPageProps extends PropsWithTestId {}

/**
 * Router path parameters for the `UserDetailPage`.
 * @param {string} userId - A user identifier.
 */
interface UserDetailPageRouteParams {
  userId: string;
}

/**
 * The `UserDetailPage` component renders information about a single `User`.
 * @returns JSX
 */
export const UserDetailPage = ({
  testid = 'page-user-detail',
}: UserDetailPageProps): JSX.Element => {
  const router = useIonRouter();
  const { createToast } = useToasts();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const { userId } = useParams<UserDetailPageRouteParams>();
  const { data: user } = useGetUser({ userId });

  return (
    <IonPage className={'page-user-detail'} data-testid={testid}>
      <Header
        backButton
        buttons={
          user && (
            <>
              <IonButton
                title="Edit user"
                className="ion-hide-md-up"
                routerLink={`/tabs/users/${userId}/edit`}
                data-testid={`${testid}-header-button-edit`}
              >
                <IonIcon slot="icon-only" icon={create} />
              </IonButton>
              <IonButton
                title="Delete user"
                className="ion-hide-md-up"
                onClick={() => setShowConfirmDelete(true)}
                data-testid={`${testid}-header-button-delete`}
              >
                <IonIcon slot="icon-only" icon={trash} />
              </IonButton>
            </>
          )
        }
        defaultHref="/tabs/users"
        title={user && user.name}
      />
      {isDeleting && <IonProgressBar type="indeterminate"></IonProgressBar>}

      <IonContent className="ion-padding">
        <Container fixed>
          <PageHeader
            className={classNames('ion-hide-md-down', 'page-header')}
            title={
              user ? (
                <div className={'title-block'}>
                  <Avatar value={user.name} />
                  <div data-testid={`${testid}-page-header-title`}>{user.name}</div>
                </div>
              ) : (
                <div data-testid={`${testid}-page-header-title`}>User Detail</div>
              )
            }
            buttons={
              user && (
                <>
                  <IonButton
                    title="Edit user"
                    routerLink={`/tabs/users/${userId}/edit`}
                    data-testid={`${testid}-page-header-button-edit`}
                  >
                    <IonIcon slot="icon-only" icon={create} />
                  </IonButton>
                  <IonButton
                    title="Delete user"
                    onClick={() => setShowConfirmDelete(true)}
                    data-testid={`${testid}-page-header-button-delete`}
                  >
                    <IonIcon slot="icon-only" icon={trash} />
                  </IonButton>
                </>
              )
            }
          />

          <UserDetail testid={`${testid}-user-detail`} userId={userId} />

          {user && (
            <UserDeleteAlert
              isOpen={showConfirmDelete}
              isPending={setIsDeleting}
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
                router.goBack();
              }}
              user={user}
            />
          )}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default UserDetailPage;
