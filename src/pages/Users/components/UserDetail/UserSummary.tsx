import classNames from 'classnames';
import { call, link, mail } from 'ionicons/icons';

import './UserSummary.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import { IonIcon } from '@ionic/react';

/**
 * Properties for the `UserSummary` component.
 * @param {User} user - A `User` object.
 * @see {@link BaseComponentProps}
 */
interface UserSummaryProps extends BaseComponentProps {
  user: User;
}

/**
 * The `UserSummary` component renders a block containing summary information
 * about a single `User` including their name, email, phone, and website.
 * @param {UserSummaryProps} props - Component propertiers.
 * @returns JSX
 */
const UserSummary = ({
  className,
  testid = 'user-summary',
  user,
}: UserSummaryProps): JSX.Element => {
  return (
    <div className={classNames('user-summary', className)} data-testid={testid}>
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
};

export default UserSummary;
