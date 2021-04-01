import { FormEvent } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { IProduct } from '@/types/models';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '@/lib/useForm';
import { ALL_PRODUCTS_QUERY } from './Products';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
    }
  }
`;

type Props = {
  product: IProduct;
};

function ProductUpdate({ product }: Props) {
  const { inputs, onChange } = useForm({
    name: product.name,
    description: product.description,
    price: product.price,
  });

  const [updateProduct, { loading, error }] = useMutation(
    UPDATE_PRODUCT_MUTATION
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await updateProduct({
      variables: { id: product.id, ...inputs },
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='name'>
          Name:
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Name'
            value={inputs.name}
            onChange={onChange}
          />
        </label>
        <label htmlFor='price'>
          Price:
          <input
            type='number'
            id='price'
            name='price'
            placeholder='Price'
            value={inputs.price}
            onChange={onChange}
          />
        </label>
        <label htmlFor='description'>
          Description:
          <textarea
            id='description'
            name='description'
            placeholder='Description'
            value={inputs.description}
            onChange={onChange}
          />
        </label>
        <button type='submit'>Update Product</button>
      </fieldset>
    </Form>
  );
}

export default ProductUpdate;
