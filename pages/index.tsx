import { GetStaticProps } from 'next';

import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import { ALL_PRODUCTS_QUERY } from '@/components/Products';
import { ProductsQueryResponse } from '@/types/queries';
import { getPerPage } from '@/utils/env';
export { default } from './products';

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const perPage = parseInt(getPerPage(), 10);

  const { data } = await apolloClient.query<ProductsQueryResponse>({
    query: ALL_PRODUCTS_QUERY,
    variables: {
      skip: 0,
      first: perPage,
    },
  });

  return addApolloState(apolloClient, {
    props: {
      products: data.allProducts,
    },
    revalidate: 1,
  });
};
