import Block from 'common/components/Block/Block';
import { BaseComponentProps } from 'common/components/types';

/**
 * Properties for the `WelcomeBlock` component.
 * @see {@link BaseComponentProps}
 */
interface WelcomeBlockProps extends BaseComponentProps {}

/**
 * The `WelcomeBlock` component renders a `Block` of information about the
 * application.
 * @param {WelcomeBlockProps} props - Component properties.
 * @returns JSX
 */
const WelcomeBlock = ({ className, testid = 'block-welcome' }: WelcomeBlockProps): JSX.Element => {
  return (
    <Block
      className={className}
      title="Welcome"
      testid={testid}
      content={
        <div>
          Welcome to the Ionic playground project. This project demonstrates how to create a
          cross-platform application using the{' '}
          <a href="https://ionic.io/" target="_blank">
            Ionic
          </a>{' '}
          framework and{' '}
          <a href="https://react.dev" target="_blank">
            React
          </a>{' '}
          components.
        </div>
      }
    />
  );
};

export default WelcomeBlock;
