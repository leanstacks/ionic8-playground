import { IonContent, IonPage } from '@ionic/react';

import './SignInPage.scss';
import { PropsWithTestId } from 'common/components/types';
import ProgressProvider from 'common/providers/ProgressProvider';
import Header from 'common/components/Header/Header';
import SignInForm from './components/SignInForm';
import Container from 'common/components/Content/Container';

/**
 * Properties for the `SignInPage` component.
 */
interface SignInPageProps extends PropsWithTestId {}

/**
 * The `SignInPage` renders the layout for user authentication.
 * @param {SignInPageProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const SignInPage = ({ testid = 'page-signin' }: SignInPageProps): JSX.Element => {
  return (
    <IonPage className="ls-signin-page" data-testid={testid}>
      <ProgressProvider>
        <Header title="Ionic Playground" />

        <IonContent fullscreen className="ion-padding">
          <Container fixed>
            <SignInForm />
          </Container>
        </IonContent>
      </ProgressProvider>
    </IonPage>
  );
};

export default SignInPage;
