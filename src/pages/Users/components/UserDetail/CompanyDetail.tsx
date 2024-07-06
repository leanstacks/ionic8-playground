import classNames from 'classnames';
import { business } from 'ionicons/icons';

import './CompanyDetail.scss';
import { BaseComponentProps } from 'common/components/types';
import { Company } from 'common/models/user';
import { IonIcon } from '@ionic/react';

/**
 * Properties for the `CompanyDetail` component.
 * @param {Company} company - A `Company` object.
 * @see {@link BaseComponentProps}
 */
interface CompanyDetailProps extends BaseComponentProps {
  company: Company;
}

/**
 * The `CompanyDetail` component renders a block which provides details about
 * a single `Company`.
 * @param {CompanyDetailProps} props - Component properties.
 * @returns JSX
 */
const CompanyDetail = ({
  className,
  company,
  testid = 'company-detail',
}: CompanyDetailProps): JSX.Element => {
  return (
    <div className={classNames('company-detail', className)} data-testid={testid}>
      <div className="content">
        <div className="header">
          <IonIcon icon={business} />
          <div>Company</div>
        </div>
        <div className="primary">{company.name}</div>
        <div>{company.catchPhrase}</div>
        <div>{company.bs}</div>
      </div>
    </div>
  );
};

export default CompanyDetail;
