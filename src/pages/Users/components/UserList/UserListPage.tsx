import { IonContent, IonPage } from '@ionic/react';
import classNames from 'classnames';

import classes from './UserListPage.module.scss';
import Header from 'common/components/Header/Header';
import Container from 'common/components/Content/Container';
import PageHeader from 'common/components/Content/PageHeader';
import UserList from './UserList';
import UserGrid from './UserGrid';

/**
 * The `UserListPage` component renders a list of all `User` objects.
 * @returns JSX
 */
export const UserListPage = (): JSX.Element => {
  const testid = 'page-user-list';

  return (
    <IonPage className={classes.page_user_list} data-testid={testid}>
      <Header />

      <IonContent>
        <Container fixed>
          <PageHeader title="Users" />
          <UserList className={classNames(classes.list_user, 'ion-hide-md-up')} />
          <UserGrid className="ion-hide-md-down" />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default UserListPage;
