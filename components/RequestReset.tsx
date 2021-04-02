import { FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import useForm from '@/lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
    }
  }
`;

function RequestReset() {
  const { inputs, onChange, resetFrom } = useForm({ email: '' });
  const [requestRest, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await requestRest();
    resetFrom();
  }

  return (
    <Form method='post' onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>

      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
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
        <button type='submit'>Request Reset!</button>
      </fieldset>
    </Form>
  );
}

export default RequestReset;
