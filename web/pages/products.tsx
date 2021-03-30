import Head from 'next/head';
import { GetStaticProps } from 'next';

import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import Products, { ALL_PRODUCTS_QUERY } from '@/components/Products';

export default function OrderPage() {
  return (
    <main>
      <Head>
        <title>OrinuFit</title>
        <link rel='icon' href='/static/favicon.png' />
      </Head>

      <Products />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
};
