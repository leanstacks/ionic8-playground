import { IonContent, IonPage } from '@ionic/react';
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
          <PageHeader
            className="ion-hide-md-down"
            title={
              user ? (
                <div className="title-block" data-testid={`${testid}-title`}>
                  <Avatar value={user.name} />
                  <div>{user.name}</div>
                </div>
              ) : (
                <div className="title-block" data-testid={`${testid}-loader`}>
                  <LoaderSkeleton animated widthStyle="2rem" heightStyle="2rem" />
                  <LoaderSkeleton animated widthStyle="20rem" heightStyle="2rem" />
                </div>
              )
            }
          />

          {user && <UserEditForm user={user} />}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default UserEditPage;
