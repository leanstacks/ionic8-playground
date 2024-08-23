import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';

import './ProfilePage.scss';
import { PropsWithTestId } from 'common/components/types';
import ProgressProvider from 'common/providers/ProgressProvider';
import Container from 'common/components/Content/Container';
import PageHeader from 'common/components/Content/PageHeader';
import Header from 'common/components/Header/Header';
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import Avatar from 'common/components/Icon/Avatar';
import ProfileForm from './ProfileForm';

const ProfilePage = ({ testid = 'page-profile' }: PropsWithTestId): JSX.Element => {
  const { data: user, isLoading } = useGetCurrentUser();

  return (
    <IonPage className="page-profile" data-testid={testid}>
      <ProgressProvider>
        <Header backButton defaultHref="/tabs/account" title="Profile" />

        <IonContent className="ion-padding">
          <Container fixed>
            {isLoading && <div>Loading State</div>}

            {user && (
              <>
                <PageHeader border inset>
                  <Avatar value={user.name} />
                  <div>Profile</div>
                </PageHeader>

                <IonGrid>
                  <IonRow>
                    <IonCol sizeMd="10" sizeLg="8" sizeXl="6">
                      <ProfileForm user={user} />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </>
            )}

            {!user && <div>Not found state</div>}
          </Container>
        </IonContent>
      </ProgressProvider>
    </IonPage>
  );
};

export default ProfilePage;
