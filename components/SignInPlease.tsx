import { FC } from 'react';

import useUser from '@/lib/useUser';
import SignIn from './SignIn';

const SignInPlease: FC = ({ children }) => {
  const user = useUser();

  if (!user) return <SignIn />;

  return <>{children}</>;
};

export default SignInPlease;
