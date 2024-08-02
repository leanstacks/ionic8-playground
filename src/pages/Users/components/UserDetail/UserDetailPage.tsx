import {
  IonAlert,
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
import { useGetUser } from 'pages/Users/api/useGetUser';
import { useDeleteUser } from 'pages/Users/api/useDeleteUser';
import { useToasts } from 'common/hooks/useToasts';
import { DismissButton } from 'common/components/Toast/Toast';
import Header from 'common/components/Header/Header';
import UserDetail from './UserDetail';
import Container from 'common/components/Content/Container';
import PageHeader from 'common/components/Content/PageHeader';
import Avatar from 'common/components/Icon/Avatar';

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
export const UserDetailPage = (): JSX.Element => {
  const testid = 'page-user-detail';
  const { createToast } = useToasts();
  const { isPending: isDeleting, mutate: deleteUser } = useDeleteUser();
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const { userId } = useParams<UserDetailPageRouteParams>();
  const router = useIonRouter();
  const { data: user } = useGetUser({ userId });

  const doDeleteUser = (userId?: number) => {
    if (userId) {
      deleteUser(
        { id: userId },
        {
          onSuccess: () => {
            setShowConfirmDelete(false);
            createToast({
              buttons: [DismissButton],
              duration: 5000,
              message: `${user?.name} deleted`,
            });
            router.goBack();
          },
          onError: () => {
            setShowConfirmDelete(false);
            //TODO: display delete user error state
          },
        },
      );
    }
  };

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
              >
                <IonIcon slot="icon-only" icon={create} />
              </IonButton>
              <IonButton
                title="Delete user"
                className="ion-hide-md-up"
                onClick={() => setShowConfirmDelete(true)}
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
                  <div>{user.name}</div>
                </div>
              ) : (
                'User Detail'
              )
            }
            buttons={
              user && (
                <>
                  <IonButton title="Edit user" routerLink={`/tabs/users/${userId}/edit`}>
                    <IonIcon slot="icon-only" icon={create} />
                  </IonButton>
                  <IonButton title="Delete user" onClick={() => setShowConfirmDelete(true)}>
                    <IonIcon slot="icon-only" icon={trash} />
                  </IonButton>
                </>
              )
            }
          />

          <UserDetail testid={`${testid}-user-detail`} userId={userId} />

          <IonAlert
            buttons={[
              {
                handler: () => {
                  setShowConfirmDelete(false);
                },
                htmlAttributes: {
                  disabled: isDeleting,
                },
                text: 'Cancel',
              },
              {
                handler: () => {
                  doDeleteUser(user?.id);
                  return false;
                },
                htmlAttributes: { disabled: isDeleting },
                text: 'Delete',
              },
            ]}
            className="alert-delete"
            header={isDeleting ? 'Deleting...' : 'Are you sure?'}
            isOpen={showConfirmDelete}
            message={
              isDeleting
                ? `Deleting ${user?.name} in progress.`
                : `Deleting ${user?.name} is permanent.`
            }
          />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default UserDetailPage;
