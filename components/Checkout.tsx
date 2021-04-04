import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { loadStripe, StripeError } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';
import nProgress from 'nprogress';

import { getStripeKey } from '@/utils/env';
import SickButton from './styles/SickButton';
import useCart from '@/lib/useCart';
import { CURRENT_USER_QUERY } from '@/lib/useUser';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripePromise = loadStripe(getStripeKey());

function CheckoutForm() {
  const router = useRouter();
  const { closeCart } = useCart();
  const [err, setErr] = useState<StripeError | null>(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [checkout, { error }] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  function turnOffLoading() {
    setLoading(false);
    nProgress.done();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    nProgress.start();

    if (!stripe || !elements) {
      turnOffLoading();
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      turnOffLoading();
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setErr(error);
      turnOffLoading();
      return;
    }

    try {
      const { data } = await checkout({
        variables: { token: paymentMethod?.id },
      });

      turnOffLoading();

      router.push({
        pathname: '/order',
        query: { id: data?.checkout?.id },
      });

      closeCart();
    } catch (error) {
      setErr(error);
      turnOffLoading();
    }
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {err && <p style={{ fontSize: 12 }}>{err.message}</p>}
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      <CardElement />
      <SickButton disabled={loading}>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
