import { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import useForm from '@/lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
    }
  }
`;

function SignUp() {
  const [err, setErr] = useState<any>({});
  const { inputs, onChange, resetFrom } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const { data } = await signup();
      if (data?.createUser) {
        resetFrom();
      }

      if (error) {
        setErr(error);
      }
    } catch {
      setErr({
        message: 'Registration failed.',
      });
    }
  }

  return (
    <Form method='post' onSubmit={handleSubmit}>
      <h2>Sign Up For an Account</h2>

      <DisplayError error={err} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please go ahead and sign
            in!
          </p>
        )}

        <label htmlFor='email'>
          Your Name
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Your Name'
            autoComplete='name'
            value={inputs.name}
            onChange={onChange}
          />
        </label>
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
        <button type='submit'>Sign Up!</button>
      </fieldset>
    </Form>
  );
}

export default SignUp;
