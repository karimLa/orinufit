import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import gql from 'graphql-tag';

import { IProduct } from '@/types/models';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  .img-container {
    width: 100%;
    object-fit: contain;
  }
`;

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
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

type Props = {
  product: IProduct;
};

function ProductSingle({ product }: Props) {
  return (
    <ProductStyles>
      <Head>
        <title>OrinuFits | {product.name}</title>
      </Head>

      <div className='img-container'>
        <Image
          src={product.photo!.image.publicUrlTransformed}
          alt={product.photo!.altText}
          width='1000'
          height='1200'
        />
      </div>
      <div className='details'>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
    </ProductStyles>
  );
}

export default ProductSingle;
