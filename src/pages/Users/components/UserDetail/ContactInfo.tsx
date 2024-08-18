import classNames from 'classnames';

import './ContactInfo.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import Icon, { IconName } from 'common/components/Icon/Icon';
import HeaderRow from 'common/components/Text/HeaderRow';

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
        {showHeader && (
          <div className="header">
            <LoaderSkeleton animated widthStyle="1.5rem" heightStyle="1.5rem" />
            <LoaderSkeleton animated widthStyle="12rem" heightStyle="1.5rem" />
          </div>
        )}
        <div className="content" data-testid={`${testid}-loader`}>
          <LoaderSkeleton animated widthStyle="20rem" heightStyle="1.25rem" />
          <LoaderSkeleton animated widthStyle="20rem" heightStyle="1.25rem" />
          <LoaderSkeleton animated widthStyle="20rem" heightStyle="1.25rem" />
        </div>
      </div>
    );
  }

  if (user) {
    // success state
    return (
      <div {...baseProps}>
        {showHeader && (
          <HeaderRow border>
            <Icon icon={IconName.User} />
            <div>Contact Info</div>
          </HeaderRow>
        )}
        <div className="content">
          {user.email && (
            <div>
              <Icon icon={IconName.Envelope} />
              <div>{user.email}</div>
            </div>
          )}
          {user.phone && (
            <div>
              <Icon icon={IconName.Phone} />
              <div>{user.phone}</div>
            </div>
          )}
          {user.website && (
            <div>
              <Icon icon={IconName.Link} />
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
