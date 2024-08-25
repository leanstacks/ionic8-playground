import { IonButton, IonButtons, IonContent, IonPage, IonText, useIonRouter } from '@ionic/react';
import { useState } from 'react';
import { useParams } from 'react-router';

import { PropsWithTestId } from 'common/components/types';
import { useGetUser } from 'pages/Users/api/useGetUser';
import { useToasts } from 'common/hooks/useToasts';
import { DismissButton } from 'common/components/Toast/Toast';
import ProgressProvider from 'common/providers/ProgressProvider';
import Header from 'common/components/Header/Header';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import Icon, { IconName } from 'common/components/Icon/Icon';
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
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const { userId } = useParams<UserDetailPageRouteParams>();
  const { data: user } = useGetUser({ userId });

  return (
    <IonPage className={'page-user-detail'} data-testid={testid}>
      <ProgressProvider>
        {({ setProgress }) => (
          <>
            <Header
              backButton
              buttons={
                user && (
                  <>
                    <IonButton
                      title="Edit user"
                      shape="round"
                      className="ion-hide-md-up"
                      routerLink={`/tabs/users/${userId}/edit`}
                      data-testid={`${testid}-header-button-edit`}
                    >
                      <Icon icon={IconName.PenToSquare} size="xl" />
                    </IonButton>
                    <IonButton
                      title="Delete user"
                      shape="round"
                      className="ion-hide-md-up"
                      onClick={() => setShowConfirmDelete(true)}
                      data-testid={`${testid}-header-button-delete`}
                    >
                      <Icon icon={IconName.Trash} size="xl" />
                    </IonButton>
                  </>
                )
              }
              defaultHref="/tabs/users"
              title={user && user.name}
            />

            <IonContent className="ion-padding">
              <Container fixed>
                {user ? (
                  <PageHeader className="ion-hide-md-down" inset border>
                    <Avatar value={user.name} size="large" />
                    <IonText data-testid={`${testid}-page-header-title`}>{user.name}</IonText>
                    <IonButtons>
                      <IonButton
                        title="Edit user"
                        shape="round"
                        routerLink={`/tabs/users/${userId}/edit`}
                        data-testid={`${testid}-page-header-button-edit`}
                      >
                        <Icon icon={IconName.PenToSquare} size="xl" />
                      </IonButton>
                      <IonButton
                        title="Delete user"
                        shape="round"
                        onClick={() => setShowConfirmDelete(true)}
                        data-testid={`${testid}-page-header-button-delete`}
                      >
                        <Icon icon={IconName.Trash} size="xl" />
                      </IonButton>
                    </IonButtons>
                  </PageHeader>
                ) : (
                  <LoaderSkeleton
                    animated
                    widthStyle="100%"
                    heightStyle="3rem"
                    className="ion-hide-md-down"
                    testid={`${testid}-loader`}
                  />
                )}

                <UserDetail testid={`${testid}-user-detail`} userId={userId} />

                {user && (
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
                      router.goBack();
                    }}
                    user={user}
                  />
                )}
              </Container>
            </IonContent>
          </>
        )}
      </ProgressProvider>
    </IonPage>
  );
};

export default UserDetailPage;
