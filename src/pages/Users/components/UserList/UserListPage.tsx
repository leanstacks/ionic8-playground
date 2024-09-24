import {
  IonButton,
  IonButtons,
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  SearchbarCustomEvent,
} from '@ionic/react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import './UserListPage.scss';
import { PropsWithTestId } from 'common/components/types';
import { QueryKey } from 'common/utils/constants';
import Header from 'common/components/Header/Header';
import Searchbar from 'common/components/Searchbar/Searchbar';
import Container from 'common/components/Content/Container';
import PageHeader from 'common/components/Content/PageHeader';
import UserList from './UserList';
import UserGrid from './UserGrid';
import ProgressProvider from 'common/providers/ProgressProvider';
import UserAddFab from '../UserAdd/UserAddFab';
import Icon, { IconName } from 'common/components/Icon/Icon';
import UserAddModal from '../UserAdd/UserAddModal';

/**
 * The `UserListPage` component renders a list of all `User` objects.
 * @returns JSX
 */
export const UserListPage = ({ testid = 'page-user-list' }: PropsWithTestId): JSX.Element => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const queryClient = useQueryClient();

  /**
   * Handle pull to refresh events.
   * @param {CustomEvent} event - The refresh event.
   */
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await queryClient.refetchQueries({ queryKey: [QueryKey.Users], exact: true });
    event.detail.complete();
  };

  /**
   * Handle changes to the search toolbar value as a user types.
   * @param {SearchbarCustomEvent} event - The event.
   */
  const onInputSearch = (event: SearchbarCustomEvent) => {
    setSearch(event.target.value ?? '');
  };

  return (
    <IonPage className="ls-page-user-list" data-testid={testid}>
      <ProgressProvider>
        <Header
          title="Users"
          toolbars={[
            {
              children: <Searchbar debounce={500} onIonInput={onInputSearch} />,
              className: 'ls-toolbar-searchbar',
            },
          ]}
        />

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
                  title="Add user"
                  onClick={() => setIsOpenModal(true)}
                  data-testid={`${testid}-page-header-button-create`}
                >
                  <Icon icon={IconName.Plus} size="xl" />
                </IonButton>
              </IonButtons>
            </PageHeader>
            <UserList className="ion-hide-md-up" filterBy={search} />
            <UserGrid className="ion-hide-md-down" filterBy={search} />
          </Container>
          <UserAddFab className="ion-hide-md-up" onClick={() => setIsOpenModal(true)} />
          <UserAddModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
        </IonContent>
      </ProgressProvider>
    </IonPage>
  );
};

export default UserListPage;
