import { FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import useForm from '@/lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { CURRENT_USER_QUERY } from '@/lib/useUser';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

function SignIn() {
  const { inputs, onChange, resetFrom } = useForm({ email: '', password: '' });
  const [signin, { data, error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data } = await signin();

    if (!data?.authenticateUserWithPassword?.message) {
      resetFrom();
      return;
    }
  }

  return (
    <Form method='post' onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>

      <DisplayError error={error || data?.authenticateUserWithPassword} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Your Email Address'
            autoComplete='email'
            value={inputs.email}
            onChange={onChange}
          />
        </label>
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Your Password'
            autoComplete='email'
            value={inputs.password}
            onChange={onChange}
          />
        </label>
        <button type='submit'>Sign in!</button>
      </fieldset>
    </Form>
  );
}

export default SignIn;
