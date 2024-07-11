import { IonCol, IonGrid, IonRow } from '@ionic/react';
import classNames from 'classnames';

import './UserDetail.scss';
import { BaseComponentProps } from 'common/components/types';
import { useGetUser } from 'pages/Users/api/useGetUser';
import CardRow from 'common/components/Card/CardRow';
import ErrorCard from 'common/components/Card/ErrorCard';
import UserSummary from './UserSummary';
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
    className: classNames('user-detail', className),
    'data-testid': testid,
  };

  // Error state
  if (isError) {
    return (
      <div {...baseProps}>
        <CardRow className="row-message" testid={`${testid}-error`}>
          <ErrorCard content="We are experiencing problems getting the requested user information." />
        </CardRow>
      </div>
    );
  }

  // Success state
  return (
    <div {...baseProps}>
      <UserSummary isLoading={isLoading} user={user} testid={`${testid}-user-summary`} />
      <IonGrid>
        <IonRow>
          <IonCol sizeXs="12" sizeMd="6">
            <CompanyDetail
              company={user?.company}
              isLoading={isLoading}
              testid={`${testid}-company-detail`}
            />
          </IonCol>
          <IonCol sizeXs="12" sizeMd="6">
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
