import {
  IonButton,
  IonButtons,
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import { useQueryClient } from '@tanstack/react-query';

import './UserListPage.scss';
import { QueryKey } from 'common/utils/constants';
import Header from 'common/components/Header/Header';
import Container from 'common/components/Content/Container';
import PageHeader from 'common/components/Content/PageHeader';
import UserList from './UserList';
import UserGrid from './UserGrid';
import ProgressProvider from 'common/providers/ProgressProvider';
import UserAddFab from '../UserAdd/components/UserAddFab';
import Icon, { IconName } from 'common/components/Icon/Icon';

/**
 * The `UserListPage` component renders a list of all `User` objects.
 * @returns JSX
 */
export const UserListPage = (): JSX.Element => {
  const testid = 'page-user-list';
  const queryClient = useQueryClient();

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await queryClient.refetchQueries({ queryKey: [QueryKey.Users], exact: true });
    event.detail.complete();
  };

  return (
    <IonPage className="page-user-list" data-testid={testid}>
      <ProgressProvider>
        <Header title="Users" />

        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>

          <Container fixed>
            <PageHeader border inset className="ion-hide-md-down">
              <div>Users</div>
              <IonButtons>
                <IonButton
                  shape="round"
                  routerLink="/tabs/users/add"
                  title="Add user"
                  data-testid={`${testid}-page-header-button-create`}
                >
                  <Icon icon={IconName.Plus} size="xl" />
                </IonButton>
              </IonButtons>
            </PageHeader>
            <UserList className="ion-hide-md-up" />
            <UserGrid className="ion-hide-md-down" />
          </Container>
          <UserAddFab className="ion-hide-md-up" />
        </IonContent>
      </ProgressProvider>
    </IonPage>
  );
};

export default UserListPage;
