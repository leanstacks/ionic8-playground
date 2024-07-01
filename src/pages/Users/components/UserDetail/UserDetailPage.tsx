import { IonContent, IonPage } from '@ionic/react';
import { useParams } from 'react-router';

import Header from 'common/components/Header/Header';
import { useGetUser } from 'pages/Users/api/useGetUser';

interface UserDetailPageRouteParams {
  userId: string;
}

export const UserDetailPage = (): JSX.Element => {
  const { userId } = useParams<UserDetailPageRouteParams>();
  const { data: user } = useGetUser({ userId });

  return (
    <IonPage>
      <Header backButton defaultHref="/users" title="Users" />

      <IonContent fullscreen>{user && <h1>{user.name}</h1>}</IonContent>
    </IonPage>
  );
};

export default UserDetailPage;
