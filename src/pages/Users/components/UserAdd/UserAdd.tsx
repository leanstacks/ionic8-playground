import { IonCol, IonGrid, IonRow, useIonRouter } from '@ionic/react';
import { useState } from 'react';
import classNames from 'classnames';

import { BaseComponentProps } from 'common/components/types';
import { useCreateUser } from 'pages/Users/api/useCreateUser';
import { useProgress } from 'common/hooks/useProgress';
import { useToasts } from 'common/hooks/useToasts';
import { DismissButton } from 'common/components/Toast/Toast';
import ErrorCard from 'common/components/Card/ErrorCard';
import UserForm from '../UserForm/UserForm';

const UserAdd = ({ className, testid = 'user-add' }: BaseComponentProps): JSX.Element => {
  const [error, setError] = useState<string>('');
  const router = useIonRouter();
  const { mutate: createUser } = useCreateUser();
  const { setProgress } = useProgress();
  const { createToast } = useToasts();

  const onCancel = () => {
    router.goBack();
  };

  return (
    <div className={classNames('user-add', className)} data-testid={testid}>
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
            {error && (
              <ErrorCard
                content={`We are experiencing problems processing your request. ${error}`}
                className="ion-margin-bottom"
                testid={`${testid}-error`}
              />
            )}

            <UserForm
              onCancel={onCancel}
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
                      router.push(`/tabs/users/${user.id}`, 'forward', 'replace');
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
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default UserAdd;
