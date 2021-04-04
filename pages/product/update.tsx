import { GetServerSideProps } from 'next';

import { SINGLE_ITEM_QUERY } from '@/components/ProductSingle';
import ProductUpdate from '@/components/ProductUpdate';
import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import { ProductQueryResponse } from '@/types/queries';
import { IProduct } from '@/types/models';
import SignInPlease from '@/components/SignInPlease';

type Props = {
  product: IProduct;
};

function UpdatePage({ product }: Props) {
  return (
    <SignInPlease>
      <ProductUpdate product={product} />
    </SignInPlease>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

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
    });
  } catch {
    return {
      notFound: true,
    };
  }
};

export default UpdatePage;
