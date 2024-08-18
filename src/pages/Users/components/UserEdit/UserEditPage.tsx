import { IonContent, IonPage, IonText } from '@ionic/react';
import { useParams } from 'react-router';

import './UserEditPage.scss';
import { useGetUser } from 'pages/Users/api/useGetUser';
import Header from 'common/components/Header/Header';
import Container from 'common/components/Content/Container';
import PageHeader from 'common/components/Content/PageHeader';
import Avatar from 'common/components/Icon/Avatar';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import UserEditForm from './UserEditForm';

/**
 * Router path parameters for the `UserEditPage`.
 * @param {string} userId - A user identifier.
 */
interface UserEditPageRouteParams {
  userId: string;
}

/**
 * The `UserEditPage` component renders a form to edit the attributes of a
 * `User`.
 * @returns {JSX.Element} JSX
 */
export const UserEditPage = (): JSX.Element => {
  const testid = 'page-user-edit';
  const { userId } = useParams<UserEditPageRouteParams>();
  const { data: user } = useGetUser({ userId });

  return (
    <IonPage className={'page-user-edit'} data-testid={testid}>
      <Header backButton defaultHref="/tabs/users" title={user && user.name} />

      <IonContent className="ion-padding">
        <Container fixed>
          {user ? (
            <>
              <PageHeader border inset className="ion-hide-md-down">
                <Avatar value={user.name} />
                <IonText data-testid={`${testid}-title`}>{user.name}</IonText>
              </PageHeader>

              <UserEditForm user={user} />
            </>
          ) : (
            <LoaderSkeleton
              animated
              widthStyle="100%"
              heightStyle="3rem"
              testid={`${testid}-loader`}
            />
          )}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default UserEditPage;
