import { IonIcon } from '@ionic/react';
import classNames from 'classnames';
import { call, link, mail } from 'ionicons/icons';

import './UserSummary.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';

/**
 * Properties for the `UserSummary` component.
 * @param {User} [user] - A `User` object.
 * @see {@link BaseComponentProps}
 */
interface UserSummaryProps extends BaseComponentProps {
  user?: User;
}

/**
 * The `UserSummary` component renders a block containing summary information
 * about a single `User` including their name, email, phone, and website.
 *
 * If the supplied `user` is null or undefined, a loading state is rendered.
 *
 * @param {UserSummaryProps} props - Component propertiers.
 * @returns JSX
 */
const UserSummary = ({
  className,
  testid = 'user-summary',
  user,
}: UserSummaryProps): JSX.Element => {
  const baseProps = {
    className: classNames('user-summary', className),
    'data-testid': testid,
  };

  if (user) {
    // successstate
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
  } else {
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
};

export default UserSummary;
