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
 * @see {@link BaseComponentProps}
 */
interface AddressDetailProps extends BaseComponentProps {
  address?: Address;
}

/**
 * The `AddressDetail` component renders a block which displays a single
 * `Address`.
 *
 * If the `address` property is null or undefined, a loading state is rendered.
 *
 * @param {AddressDetailProps} props - Component properties.
 * @returns JSX
 */
const AddressDetail = ({
  address,
  className,
  testid = 'address-detail',
}: AddressDetailProps): JSX.Element => {
  const baseProps = {
    className: classNames('address-detail', className),
    'data-testid': testid,
  };

  if (address) {
    // success state
    return (
      <div {...baseProps}>
        <div className="content">
          <div className="header">
            <IonIcon icon={map} />
            <div>Address</div>
          </div>
          <div>{address.street}</div>
          <div>{address.suite}</div>
          <div>{address.city}</div>
          <div>{address.zipcode}</div>
        </div>
      </div>
    );
  } else {
    // loading state
    return (
      <div {...baseProps}>
        <div className="content">
          <div className="header">
            <IonIcon icon={map} />
            <LoaderSkeleton animated heightStyle="1.5rem" widthStyle="10rem" />
          </div>
          <LoaderSkeleton animated heightStyle="1rem" widthStyle="20rem" />
          <LoaderSkeleton animated heightStyle="1rem" widthStyle="20rem" />
          <LoaderSkeleton animated heightStyle="1rem" widthStyle="20rem" />
          <LoaderSkeleton animated heightStyle="1rem" widthStyle="20rem" />
        </div>
      </div>
    );
  }
};

export default AddressDetail;
