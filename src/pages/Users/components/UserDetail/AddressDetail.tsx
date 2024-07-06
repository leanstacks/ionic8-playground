import { IonIcon } from '@ionic/react';
import { map } from 'ionicons/icons';
import classNames from 'classnames';

import './AddressDetail.scss';
import { BaseComponentProps } from 'common/components/types';
import { Address } from 'common/models/user';

/**
 * Properties for the `AddressDetail` component.
 * @param {Address} address - An `Address` object.
 * @see {@link BaseComponentProps}
 */
interface AddressDetailProps extends BaseComponentProps {
  address: Address;
}

/**
 * The `AddressDetail` component renders a block which displays a single
 * `Address`.
 * @param {AddressDetailProps} props - Component properties.
 * @returns JSX
 */
const AddressDetail = ({
  address,
  className,
  testid = 'address-detail',
}: AddressDetailProps): JSX.Element => {
  return (
    <div className={classNames('address-detail', className)} data-testid={testid}>
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
};

export default AddressDetail;
