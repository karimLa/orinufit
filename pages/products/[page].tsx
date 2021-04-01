import { GetStaticPaths, GetStaticProps } from 'next';

import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import { ProductsQueryResponse } from '@/types/queries';
import { ALL_PRODUCTS_QUERY } from '@/components/Products';
import { PAGINATION_QUERY } from '@/components/Pagination';
import { getPerPage } from '@/utils/env';

export { default } from '../index';

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: PAGINATION_QUERY,
  });

  const count: number = data._allProductsMeta.count;
  const perPage = parseInt(getPerPage(), 10);
  const pageCount = Math.ceil(count / perPage);

  const paths = Array.from({ length: pageCount })
    .fill(pageCount)
    .map((_, i) => ({ params: { page: (i + 1).toString() } }));

  return addApolloState(apolloClient, {
    paths,
    fallback: 'blocking',
  });
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let page = params!.page;

  if (!page || Array.isArray(page)) {
    return {
      notFound: true,
    };
  }

  const pageNumber = parseInt(page, 10);
  const perPage = parseInt(getPerPage(), 10);

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<ProductsQueryResponse>({
    query: ALL_PRODUCTS_QUERY,
    variables: {
      skip: pageNumber * perPage - perPage,
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
