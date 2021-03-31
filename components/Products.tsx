import gql from 'graphql-tag';
import styled from 'styled-components';

import { IProduct } from '@/types/models';
import ProductCard from './ProductCard';

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

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

type Props = {
  products: IProduct[];
};

function Products({ products }: Props) {
  return (
    <ProductsListStyles>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </ProductsListStyles>
  );
}

export default Products;
