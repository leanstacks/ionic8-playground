import { IonContent, IonPage } from '@ionic/react';

import { PropsWithTestId } from 'common/components/types';
import Header from 'common/components/Header/Header';

interface SignInPageProps extends PropsWithTestId {}

const SignInPage = ({ testid = 'page-signin' }: SignInPageProps): JSX.Element => {
  return (
    <IonPage className="page-signin" data-testid={testid}>
      <Header />

      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default SignInPage;
