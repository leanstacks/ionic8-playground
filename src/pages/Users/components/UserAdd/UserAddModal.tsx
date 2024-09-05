import { IonModalCustomEvent } from '@ionic/core';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { ComponentPropsWithoutRef, useState } from 'react';

import { PropsWithTestId } from 'common/components/types';
import { useCreateUser } from 'pages/Users/api/useCreateUser';
import { useProgress } from 'common/hooks/useProgress';
import { useToasts } from 'common/hooks/useToasts';
import { DismissButton } from 'common/components/Toast/Toast';
import Icon, { IconName } from 'common/components/Icon/Icon';
import UserForm from '../UserForm/UserForm';
import ErrorCard from 'common/components/Card/ErrorCard';

interface UserAddModalProps extends PropsWithTestId, ComponentPropsWithoutRef<typeof IonModal> {
  setIsOpen: (isOpen: boolean) => void;
}

const UserAddModal = ({
  testid = 'modal-user-add',
  setIsOpen,
  onIonModalDidDismiss,
  ...modalProps
}: UserAddModalProps): JSX.Element => {
  const [error, setError] = useState<string>('');
  const router = useIonRouter();
  const { setProgress } = useProgress();
  const { createToast } = useToasts();
  const { mutate: createUser } = useCreateUser();

  const didDismiss = (e: IonModalCustomEvent<OverlayEventDetail>) => {
    onIonModalDidDismiss?.(e);
    setIsOpen(false);
  };

  return (
    <IonModal onIonModalDidDismiss={didDismiss} {...modalProps} data-testid={testid}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add User</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>
              <Icon icon={IconName.Xmark} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        {error && (
          <ErrorCard
            content={`We are experiencing problems processing your request. ${error}`}
            className="ion-margin-bottom"
            testid={`${testid}-error`}
          />
        )}
        <UserForm
          onCancel={() => setIsOpen(false)}
          onSubmit={(values, { setSubmitting }) => {
            setProgress(true);
            setError('');
            createUser(
              { user: values },
              {
                onSuccess: (user) => {
                  setProgress(false);
                  setSubmitting(false);
                  createToast({
                    buttons: [DismissButton],
                    duration: 5000,
                    message: `${user.name} created`,
                  });
                  setIsOpen(false);
                  router.push(`/tabs/users/${user.id}`);
                },
                onError(error) {
                  setProgress(false);
                  setError(error.message);
                  setSubmitting(false);
                },
              },
            );
          }}
          testid={`${testid}-form`}
        />
      </IonContent>
    </IonModal>
  );
};

export default UserAddModal;
