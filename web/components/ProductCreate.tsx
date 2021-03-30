import useForm from '@/lib/useForm';
import { FormEvent } from 'react';
import Form from './styles/Form';

function ProductCreate() {
  const { inputs, onChange } = useForm({
    image: '',
    name: '',
    description: '',
    price: 0,
  });

  function createProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(inputs);
  }

  return (
    <Form onSubmit={createProduct}>
      <fieldset>
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
