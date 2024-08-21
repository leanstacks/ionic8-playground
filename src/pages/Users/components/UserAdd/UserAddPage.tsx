import { IonContent, IonPage } from '@ionic/react';

import { PropsWithTestId } from 'common/components/types';
import ProgressProvider from 'common/providers/ProgressProvider';
import PageHeader from 'common/components/Content/PageHeader';
import Header from 'common/components/Header/Header';
import Container from 'common/components/Content/Container';
import UserAdd from './UserAdd';

/**
 * The `UserAddPage` component renders a page layout containing a form to
 * create new `User`s.
 * @param {PropsWithTestId} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserAddPage = ({ testid = 'page-user-add' }: PropsWithTestId): JSX.Element => {
  return (
    <IonPage className="page-user-add" data-testid={testid}>
      <ProgressProvider>
        <Header backButton defaultHref="/tabs/users" title="Add User" />
        <IonContent className="ion-padding">
          <Container fixed>
            <PageHeader border inset className="ion-hide-md-down">
              Add User
            </PageHeader>

            <UserAdd />
          </Container>
        </IonContent>
      </ProgressProvider>
    </IonPage>
  );
};

export default UserAddPage;
