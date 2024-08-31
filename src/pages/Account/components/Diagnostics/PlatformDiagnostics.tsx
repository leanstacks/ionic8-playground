import { IonBadge, IonItem, IonLabel, IonListHeader } from '@ionic/react';
import classNames from 'classnames';

import './PlatformDiagnostics.scss';
import { BaseComponentProps } from 'common/components/types';
import { usePlatform } from 'common/hooks/usePlatform';
import List from 'common/components/List/List';

/**
 * The `PlatformDiagnostics` component displays application diagnostic information
 * as a list of key/value pairs. The attributes are obtained from the Ionic
 * framework.
 *
 * @param {BaseComponentProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const PlatformDiagnostics = ({
  className,
  testid = 'diagnostics-platform',
}: BaseComponentProps): JSX.Element => {
  const { isNativePlatform, platforms } = usePlatform();

  return (
    <List className={classNames('platform-diagnostics', className)} data-testid={testid}>
      <IonListHeader lines="full">
        <IonLabel>Platform</IonLabel>
      </IonListHeader>
      <IonItem className="text-sm">
        <IonLabel className="font-medium ion-margin-end">Native</IonLabel>
        {isNativePlatform ? <IonBadge>YES</IonBadge> : <IonBadge color="medium">NO</IonBadge>}
      </IonItem>
      <IonItem className="text-sm">
        <IonLabel class="font-medium ion-margin-end">Platforms</IonLabel>
        <div className="badges">
          {platforms.map((platform) => (
            <IonBadge key={platform} color="medium">
              {platform}
            </IonBadge>
          ))}
        </div>
      </IonItem>
    </List>
  );
};

export default PlatformDiagnostics;
