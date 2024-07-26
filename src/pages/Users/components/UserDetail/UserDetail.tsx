import { IonCol, IonGrid, IonRow } from '@ionic/react';
import classNames from 'classnames';

import classes from './UserDetail.module.scss';
import { BaseComponentProps } from 'common/components/types';
import { useGetUser } from 'pages/Users/api/useGetUser';
import CardRow from 'common/components/Card/CardRow';
import ErrorCard from 'common/components/Card/ErrorCard';
import ContactInfo from './ContactInfo';
import CompanyDetail from './CompanyDetail';
import AddressDetail from './AddressDetail';

/**
 * Properties for the `UserDetail` component.
 * @param {string} [userId] - Optional. A `User` identifier.
 * @see {@link BaseComponentProps}
 */
interface UserDetailProps extends BaseComponentProps {
  userId?: string;
}

/**
 * The `UserDetail` component renders a block of detailed information about a
 * `User`.  The block contains the user summary information, company details,
 * and address details.
 *
 * The component fetches the `User` when the `userId` property is not empty,
 * otherwise a loading state is displayed. If an error is returned, an
 * error message is displayed.
 *
 * @param {UserDetailProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserDetail = ({
  className,
  testid = 'user-detail',
  userId,
}: UserDetailProps): JSX.Element => {
  const { data: user, isError, isLoading } = useGetUser({ userId });

  const baseProps = {
    className: classNames(classes.user_detail, className),
    'data-testid': testid,
  };

  // Error state
  if (isError) {
    return (
      <div {...baseProps}>
        <CardRow className={classes.row_message} testid={`${testid}-error`}>
          <ErrorCard content="We are experiencing problems getting the requested user information." />
        </CardRow>
      </div>
    );
  }

  // Success state
  return (
    <div {...baseProps}>
      <IonGrid>
        <IonRow>
          <IonCol sizeXs="12" sizeMd="6" sizeXl="4">
            <ContactInfo isLoading={isLoading} user={user} testid={`${testid}-user-summary`} />
          </IonCol>
          <IonCol sizeXs="12" sizeMd="6" sizeXl="4">
            <CompanyDetail
              company={user?.company}
              isLoading={isLoading}
              testid={`${testid}-company-detail`}
            />
          </IonCol>
          <IonCol sizeXs="12" sizeMd="6" sizeXl="4">
            <AddressDetail
              address={user?.address}
              isLoading={isLoading}
              testid={`${testid}-address-detail`}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default UserDetail;
