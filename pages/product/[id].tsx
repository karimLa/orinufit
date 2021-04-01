import { GetStaticPaths, GetStaticProps } from 'next';

import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import { ALL_PRODUCTS_QUERY } from '@/components/Products';
import ProductSingle, { SINGLE_ITEM_QUERY } from '@/components/ProductSingle';
import { ProductQueryResponse, ProductsQueryResponse } from '@/types/queries';
import { IProduct } from '@/types/models';

type Props = {
  product: IProduct;
};

function ProductPage({ product }: Props) {
  return <ProductSingle product={product} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<ProductsQueryResponse>({
    query: ALL_PRODUCTS_QUERY,
  });

  const paths = data.allProducts.map((p) => ({ params: { id: p.id } }));

  return addApolloState(apolloClient, {
    paths,
    fallback: 'blocking',
  });
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params!.id;

  if (!id || Array.isArray(id)) {
    // TODO(soramon0): check if id is valid
    return {
      notFound: true,
    };
  }

  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query<ProductQueryResponse>({
      query: SINGLE_ITEM_QUERY,
      variables: { id },
    });

    return addApolloState(apolloClient, {
      props: {
        product: data.Product,
      },
      revalidate: 1,
    });
  } catch {
    return {
      notFound: true,
    };
  }
};

export default ProductPage;
