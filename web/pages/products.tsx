import Head from 'next/head';
import { GetStaticProps } from 'next';

import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import Products, { ALL_PRODUCTS_QUERY } from '@/components/Products';
import { IProduct } from '@/types/models';
import { ProductsQueryResponse } from '@/types/queries';

type Props = {
  products: IProduct[];
};

export default function OrderPage({ products }: Props) {
  return (
    <main>
      <Head>
        <title>OrinuFit</title>
        <link rel='icon' href='/static/favicon.png' />
      </Head>

      <Products products={products} />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<ProductsQueryResponse>({
    query: ALL_PRODUCTS_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {
      products: data.allProducts,
    },
    revalidate: 1,
  });
};
