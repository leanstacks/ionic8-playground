import { IonIcon } from '@ionic/react';
import classNames from 'classnames';
import { call, link, mail, person } from 'ionicons/icons';

import './ContactInfo.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';

/**
 * Properties for the `ContactInfo` component.
 * @param {boolean} [isLoading] - Indicates if the `user` is being loaded.
 * @param {boolean} [showHeader] - Indicates if the header should be rendered.
 * @param {User} [user] - A `User` object.
 * @see {@link BaseComponentProps}
 */
interface ContactInfoProps extends BaseComponentProps {
  isLoading?: boolean;
  showHeader?: boolean;
  user?: User;
}

/**
 * The `ContactInfo` component renders a block containing contact information
 * about a single `User` including their email, phone, and website.
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
 * @param {ContactInfoProps} props - Component properties.
 * @returns {JSX.Element | false} Returns JSX when loading or a user is
 * provided, otherwise returns `false`.
 */
const ContactInfo = ({
  className,
  isLoading = false,
  showHeader = true,
  testid = 'contact-info',
  user,
}: ContactInfoProps): JSX.Element | false => {
  const baseProps = {
    className: classNames('contact-info', className),
    'data-testid': testid,
  };

  if (isLoading) {
    // loading state
    return (
      <div {...baseProps}>
        <div className="content" data-testid={`${testid}-loader`}>
          {showHeader && (
            <div className="header">
              <LoaderSkeleton animated widthStyle="2rem" heightStyle="1.5rem" />
              <LoaderSkeleton animated widthStyle="20rem" heightStyle="1.5rem" />
            </div>
          )}
          <LoaderSkeleton animated widthStyle="12rem" heightStyle="1rem" />
          <LoaderSkeleton animated widthStyle="12rem" heightStyle="1rem" />
          <LoaderSkeleton animated widthStyle="12rem" heightStyle="1rem" />
        </div>
      </div>
    );
  }

  if (user) {
    // success state
    return (
      <div {...baseProps}>
        <div className="content">
          {showHeader && (
            <div className="header">
              <IonIcon icon={person} />
              <div>Contact Info</div>
            </div>
          )}
          {user.email && (
            <div>
              <IonIcon icon={mail} />
              <div>{user.email}</div>
            </div>
          )}
          {user.phone && (
            <div>
              <IonIcon icon={call} />
              <div>{user.phone}</div>
            </div>
          )}
          {user.website && (
            <div>
              <IonIcon icon={link} />
              <div>{user.website}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // not loading and no user
  return false;
};

export default ContactInfo;
