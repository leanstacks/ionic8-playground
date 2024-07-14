import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { useParams } from 'react-router';
import { create } from 'ionicons/icons';

import classes from './UserDetailPage.module.scss';
import { useGetUser } from 'pages/Users/api/useGetUser';
import Header from 'common/components/Header/Header';
import UserDetail from './UserDetail';
import Container from 'common/components/Content/Container';
import PageHeader from 'common/components/Content/PageHeader';
import Avatar from 'common/components/Icon/Avatar';
import classNames from 'classnames';

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
    <IonPage className={classes['page-user-detail']} data-testid={testid}>
      <Header backButton defaultHref="/tabs/users" title={user && user.name} />

      <IonContent className="ion-padding">
        <Container fixed>
          <PageHeader
            className={classNames('ion-hide-md-down', classes['page-header'])}
            title={
              user ? (
                <>
                  <div className={classes['title-block']}>
                    <Avatar value={user.name} className={classes.avatar} />
                    <div>{user.name}</div>
                  </div>
                </>
              ) : (
                'User Detail'
              )
            }
            buttons={
              <>
                <IonButton title="Edit user">
                  <IonIcon slot="icon-only" icon={create} />
                </IonButton>
              </>
            }
          />

          <UserDetail testid={`${testid}-user-detail`} userId={userId} />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default UserDetailPage;
