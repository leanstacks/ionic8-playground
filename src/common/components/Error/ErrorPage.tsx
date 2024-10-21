import { IonButton, IonButtons, IonContent, IonFooter, IonPage, IonToolbar } from '@ionic/react';
import { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { ValidationError } from 'yup';
import { AxiosError } from 'axios';

import { PropsWithTestId } from '../types';
import './ErrorPage.scss';
import Header from '../Header/Header';
import Container from '../Content/Container';
import Icon, { IconName } from '../Icon/Icon';
import ButtonRow from '../Button/ButtonRow';

/**
 * Properties for the `ErrorPage` component.
 */
interface ErrorPageProps extends FallbackProps, PropsWithTestId {}

/**
 * The `ErrorPage` displays the attributes of an `Error`.
 * @param {ErrorPageProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const ErrorPage = ({
  error,
  resetErrorBoundary,
  testid = 'page-error',
}: ErrorPageProps): JSX.Element => {
  const { t } = useTranslation();

  let title;
  let message;
  if (error instanceof ValidationError) {
    title = t('error-validation');
    message = error.errors.reduce((msg, error) => `${msg} ${error}`);
  } else if (error instanceof AxiosError) {
    title = error.status ?? error.code;
    message = `${error.message}. ${error.config?.url}`;
  } else {
    title = error.name ?? t('error');
    message = error.message ?? error;
  }

  return (
    <IonPage className="ls-error-page" data-testid={testid}>
      <Header title={t('ionic-playground')} />

      <IonContent className="ion-padding">
        <Container fixed className="ls-error-page__container">
          <div className="ls-error-page__content">
            <Icon
              icon={IconName.FaceSurprise}
              color="warning"
              size="10x"
              className="ls-error-page__icon"
            />

            <div className="text-3xl font-bold uppercase ls-error-page__title">{title}</div>

            <div className="ion-text-center text-lg ls-error-page__message">{message}</div>

            <ButtonRow className="ion-hide-md-down ls-error-page__button-row">
              <IonButton color="medium" onClick={() => resetErrorBoundary()}>
                {t('label.try-again')}
              </IonButton>
            </ButtonRow>
          </div>
        </Container>
      </IonContent>
      <IonFooter className="ion-hide-md-up">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => resetErrorBoundary()}>{t('label.try-again')}</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ErrorPage;
