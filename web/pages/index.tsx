import { GetStaticProps } from 'next';

import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import { ALL_PRODUCTS_QUERY } from '@/components/Products';
export { default } from './products';

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {
      products: data.allProducts,
    },
    revalidate: 1,
  });
};
