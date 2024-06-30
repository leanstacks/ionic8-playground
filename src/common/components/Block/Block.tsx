import { ReactNode } from 'react';
import classNames from 'classnames';

import './Block.scss';
import { BaseComponentProps } from '../types';

interface BlockProps extends BaseComponentProps {
  content?: ReactNode;
  title?: string;
}

const Block = ({ className, content, testid = 'block', title }: BlockProps): JSX.Element => {
  return (
    <div className={classNames('block', className)} data-testid={testid}>
      {title && (
        <div className="block-title" data-testid={`${testid}-title`}>
          {title}
        </div>
      )}
      {content && (
        <div className="block-content" data-testid={`${testid}-content`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Block;
