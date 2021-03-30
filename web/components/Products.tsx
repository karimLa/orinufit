import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { IProduct } from '@/types/models';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

type QueryResponse = {
  allProducts: IProduct[];
};

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

function Products() {
  const { data, error, loading } = useQuery<QueryResponse>(ALL_PRODUCTS_QUERY);

  if (loading || !data) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <ProductsListStyles>
      {data.allProducts.map((p) => (
        <Product key={p.id} product={p} />
      ))}
    </ProductsListStyles>
  );
}

export default Products;
