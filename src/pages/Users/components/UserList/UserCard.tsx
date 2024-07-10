import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import { mail } from 'ionicons/icons';
import classNames from 'classnames';

import './UserCard.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';

interface UserCardProps extends BaseComponentProps {
  user: User;
}

const UserCard = ({ className, testid = 'card-user', user }: UserCardProps): JSX.Element => {
  return (
    <IonCard
      className={classNames('card-user', classNames)}
      routerLink={`/tabs/users/${user.id}`}
      data-testid={testid}
    >
      <IonCardHeader className="header">
        <IonCardTitle className="title-block">{user.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="content">
        <div className="content-row secondary">
          <div>
            <IonIcon icon={mail} />
            <div>{user.email}</div>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default UserCard;
