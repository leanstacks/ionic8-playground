import classNames from 'classnames';
import { BaseComponentProps } from 'common/components/types';
import { object, string } from 'yup';

interface SignInFormProps extends BaseComponentProps {}

interface SignInFormValues {
  username: string;
  password: string;
}

const validationSchema = object<SignInFormValues>({
  username: string().required('Required. '),
  password: string().required('Required. '),
});

const SignInForm = ({ className, testid = 'form-signin' }: SignInFormProps): JSX.Element => {
  return <div className={classNames('form-signin', className)} data-testid={testid}></div>;
};

export default SignInForm;
