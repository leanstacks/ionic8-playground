import { IonIcon } from '@ionic/react';
import { map } from 'ionicons/icons';
import classNames from 'classnames';

import './AddressDetail.scss';
import { Address } from 'common/models/user';
import { BaseComponentProps } from 'common/components/types';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';

/**
 * Properties for the `AddressDetail` component.
 * @param {Address} [address] - An `Address` object.
 * @param {boolean} [isLoading] - Indicates if the `user` is being loaded.
 * @see {@link BaseComponentProps}
 */
interface AddressDetailProps extends BaseComponentProps {
  address?: Address;
  isLoading?: boolean;
}

/**
 * The `AddressDetail` component renders a block which displays a single
 * `Address`.
 *
 * If `isLoading` is `true` the loading state is rendered.
 *
 * If `isLoading` is `false` and the `address` property is provided, the
 * address attributes are rendered.
 *
 * If `isLoading` is `false` and the `address` property is empty, the
 * component returns `false` so that the component remains in the React
 * hierarchy, but does not render anything.
 *
 * @param {AddressDetailProps} props - Component properties.
 * @returns {JSX.Element | false} Returns JSX when loading or a user is
 * provided, otherwise returns `false`.
 */
const AddressDetail = ({
  address,
  className,
  isLoading = false,
  testid = 'address-detail',
}: AddressDetailProps): JSX.Element | false => {
  const baseProps = {
    className: classNames('address-detail', className),
    'data-testid': testid,
  };

  if (isLoading) {
    // loading state
    return (
      <div {...baseProps}>
        <div className="header">
          <LoaderSkeleton animated heightStyle="1.5rem" widthStyle="1.5rem" />
          <LoaderSkeleton animated heightStyle="1.5rem" widthStyle="10rem" />
        </div>
        <div className="content" data-testid={`${testid}-loader`}>
          <LoaderSkeleton animated heightStyle="1.25rem" widthStyle="20rem" />
          <LoaderSkeleton animated heightStyle="1.25rem" widthStyle="20rem" />
          <LoaderSkeleton animated heightStyle="1.25rem" widthStyle="20rem" />
          <LoaderSkeleton animated heightStyle="1.25rem" widthStyle="20rem" />
        </div>
      </div>
    );
  }

  if (address) {
    // success state
    return (
      <div {...baseProps}>
        <div className="header">
          <IonIcon icon={map} />
          <div>Address</div>
        </div>
        <div className="content">
          <div>{address.street}</div>
          <div>{address.suite}</div>
          <div>{address.city}</div>
          <div>{address.zipcode}</div>
        </div>
      </div>
    );
  }

  // not loading and no user
  return false;
};

export default AddressDetail;
