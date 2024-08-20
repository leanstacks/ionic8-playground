import { useState } from 'react';
import { IonCol, IonGrid, IonRow, useIonRouter } from '@ionic/react';
import classNames from 'classnames';

import './UserEdit.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import { useUpdateUser } from 'pages/Users/api/useUpdateUser';
import { useToasts } from 'common/hooks/useToasts';
import { DismissButton } from 'common/components/Toast/Toast';
import CardRow from 'common/components/Card/CardRow';
import ErrorCard from 'common/components/Card/ErrorCard';
import UserForm from '../UserForm/UserForm';

/**
 * Properties for the `UserEditForm` component.
 * @see {@link BaseComponentProps}
 */
interface UserEditFormProps extends BaseComponentProps {
  user: User;
}

/**
 * The `UserEditForm` component renders a Formik form for editing a `User`.
 * @param {UserEditFormProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserEdit = ({ className, user, testid = 'user-edit' }: UserEditFormProps): JSX.Element => {
  const router = useIonRouter();
  const [error, setError] = useState<string>('');
  const { mutate: updateUser } = useUpdateUser();
  const { createToast } = useToasts();

  const onCancel = () => {
    router.goBack();
  };

  return (
    <div className={classNames('user-edit', className)} data-testid={testid}>
      {error && (
        <CardRow className="row-message" testid={`${testid}-error`}>
          <ErrorCard content={`We are experiencing problems processing your request. ${error}`} />
        </CardRow>
      )}
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
            <UserForm
              user={user}
              onCancel={onCancel}
              onSubmit={(values, { setSubmitting }) => {
                setError('');
                updateUser(
                  { user: { ...user, ...values } },
                  {
                    onSuccess: (user) => {
                      setSubmitting(false);
                      createToast({
                        buttons: [DismissButton],
                        duration: 5000,
                        message: `${user.name} updated`,
                      });
                      if (router.canGoBack()) {
                        router.goBack();
                      } else {
                        router.push(`/tabs/users/${user.id}`, 'back', 'replace');
                      }
                    },
                    onError(error) {
                      setError(error.message);
                      setSubmitting(false);
                    },
                  },
                );
              }}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default UserEdit;
