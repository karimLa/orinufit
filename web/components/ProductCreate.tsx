import { FormEvent } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import Form from './styles/Form';
import useForm from '@/lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      price
      description
    }
  }
`;

function ProductCreate() {
  const { inputs, onChange, clearForm } = useForm({
    image: '',
    name: '',
    description: '',
    price: 0,
  });

  const [createProduct, { loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await createProduct();
    clearForm();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='image'>
          Image:
          <input
            type='file'
            id='image'
            name='image'
            required
            onChange={onChange}
          />
        </label>
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
        <button type='submit'>+ Add Product</button>
      </fieldset>
    </Form>
  );
}

export default ProductCreate;
