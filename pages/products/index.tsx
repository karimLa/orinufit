import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import Products, { ALL_PRODUCTS_QUERY } from '@/components/Products';
import Pagination from '@/components/Pagination';
import { IProduct } from '@/types/models';
import { ProductsQueryResponse } from '@/types/queries';
import { getPerPage } from '@/utils/env';

type Props = {
  products: IProduct[];
};

export default function OrderPage({ products }: Props) {
  const router = useRouter();

  function getPageNumber() {
    const { page } = router.query;
    let currentPage = 1;

    if (!page || Array.isArray(page)) return currentPage;

    currentPage = parseInt(page, 10);

    if (isNaN(currentPage)) return 1;

    return currentPage;
  }

  return (
    <main>
      <Head>
        <link rel='icon' href='/static/favicon.png' />
      </Head>

      <Pagination page={getPageNumber()} />
      <Products products={products} />
      <Pagination page={getPageNumber()} />
    </main>
  );
}

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
