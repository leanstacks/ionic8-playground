import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { useParams } from 'react-router';
import { create } from 'ionicons/icons';
import classNames from 'classnames';

import classes from './UserDetailPage.module.scss';
import { useGetUser } from 'pages/Users/api/useGetUser';
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
  const { userId } = useParams<UserDetailPageRouteParams>();
  const { data: user } = useGetUser({ userId });

  return (
    <IonPage className={classes.page_user_detail} data-testid={testid}>
      <Header
        backButton
        buttons={
          <IonButton
            title="Edit user"
            className="ion-hide-md-up"
            routerLink={`/tabs/users/${userId}/edit`}
          >
            <IonIcon slot="icon-only" icon={create} />
          </IonButton>
        }
        defaultHref="/tabs/users"
        title={user && user.name}
      />

      <IonContent className="ion-padding">
        <Container fixed>
          <PageHeader
            className={classNames('ion-hide-md-down', classes.page_header)}
            title={
              user ? (
                <div className={classes.title_block}>
                  <Avatar value={user.name} className={classes.avatar} />
                  <div>{user.name}</div>
                </div>
              ) : (
                'User Detail'
              )
            }
            buttons={
              <IonButton title="Edit user" routerLink={`/tabs/users/${userId}/edit`}>
                <IonIcon slot="icon-only" icon={create} />
              </IonButton>
            }
          />

          <UserDetail testid={`${testid}-user-detail`} userId={userId} />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default UserDetailPage;
