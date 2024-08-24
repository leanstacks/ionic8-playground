import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';

import { PropsWithTestId } from 'common/components/types';
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import ProgressProvider from 'common/providers/ProgressProvider';
import Container from 'common/components/Content/Container';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import PageHeader from 'common/components/Content/PageHeader';
import Header from 'common/components/Header/Header';
import ProfileForm from './ProfileForm';
import ErrorCard from 'common/components/Card/ErrorCard';
import CardRow from 'common/components/Card/CardRow';

const ProfilePage = ({ testid = 'page-profile' }: PropsWithTestId): JSX.Element => {
  const { data: user, isError, isLoading } = useGetCurrentUser();

  return (
    <IonPage className="page-profile" data-testid={testid}>
      <ProgressProvider>
        <Header backButton defaultHref="/tabs/account" title="Profile" />

        <IonContent className="ion-padding">
          <Container fixed>
            {isLoading && (
              <div data-testid={`${testid}-loading`}>
                <LoaderSkeleton animated heightStyle="3rem" className="ion-margin-bottom" />
                <LoaderSkeleton animated heightStyle="20rem" />
              </div>
            )}

            {isError && (
              <CardRow>
                <ErrorCard
                  content={`We are unable to retrieve your profile details at this time.`}
                  className="ion-margin-bottom"
                  testid={`${testid}-error`}
                />
              </CardRow>
            )}

            {user && (
              <>
                <PageHeader border inset>
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
          </Container>
        </IonContent>
      </ProgressProvider>
    </IonPage>
  );
};

export default ProfilePage;
