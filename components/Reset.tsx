import { FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import useForm from '@/lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      message
    }
  }
`;

type Props = {
  token: string;
};

function Reset({ token }: Props) {
  const { inputs, onChange, resetFrom } = useForm({
    password: '',
    email: '',
    token,
  });
  const [reset, { data, error, loading }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  const err = data?.redeemUserPasswordResetToken?.message
    ? data?.redeemUserPasswordResetToken
    : error;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await reset();
    resetFrom();
  }

  return (
    <Form method='post' onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>

      <DisplayError error={err} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! Password Rested!</p>
        )}

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
        <button type='submit'>Reset!</button>
      </fieldset>
    </Form>
  );
}

export default Reset;
