import { IonIcon } from '@ionic/react';
import classNames from 'classnames';
import { call, link, mail } from 'ionicons/icons';

import './UserSummary.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';

/**
 * Properties for the `UserSummary` component.
 * @param {boolean} [isLoading] - Indicates if the `user` is being loaded.
 * @param {User} [user] - A `User` object.
 * @see {@link BaseComponentProps}
 */
interface UserSummaryProps extends BaseComponentProps {
  isLoading?: boolean;
  user?: User;
}

/**
 * The `UserSummary` component renders a block containing summary information
 * about a single `User` including their name, email, phone, and website.
 *
 * If `isLoading` is `true` the loading state is rendered.
 *
 * If `isLoading` is `false` and the `user` property is provided, the
 * user attributes are rendered.
 *
 * If `isLoading` is `false` and the `user` property is empty, the
 * component returns `false` so that the component remains in the React
 * hierarchy, but does not render anything.
 *
 * @param {UserSummaryProps} props - Component propertiers.
 * @returns {JSX.Element | false} Returns JSX when loading or a user is
 * provided, otherwise returns `false`.
 */
const UserSummary = ({
  className,
  isLoading = false,
  testid = 'user-summary',
  user,
}: UserSummaryProps): JSX.Element | false => {
  const baseProps = {
    className: classNames('user-summary', className),
    'data-testid': testid,
  };

  if (isLoading) {
    // loading state
    return (
      <div {...baseProps}>
        <div data-testid={`${testid}-loader`}>
          <div style={{ marginBottom: '0.5rem' }}>
            <LoaderSkeleton animated heightStyle="2rem" widthStyle="16rem" />
          </div>
          <div style={{ display: 'flex', columnGap: '1rem' }}>
            <LoaderSkeleton animated widthStyle="12rem" />
            <LoaderSkeleton animated widthStyle="12rem" />
            <LoaderSkeleton animated widthStyle="12rem" />
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    // success state
    return (
      <div {...baseProps}>
        <div className="content">
          <div className="content-row primary">
            <div className="name">{user.name}</div>
          </div>
          <div className="content-row secondary">
            <div>
              <IonIcon icon={mail} />
              <div>{user.email}</div>
            </div>
            <div>
              <IonIcon icon={call} />
              <div>{user.phone}</div>
            </div>
            <div>
              <IonIcon icon={link} />
              <div>{user.website}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // not loading and no user
  return false;
};

export default UserSummary;
