import useForm from '@/lib/useForm';

function ProductCreate() {
  const { inputs, onChange, clearForm, resetFrom } = useForm({
    name: '',
    description: '',
    price: 0,
  });

  return (
    <form>
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

      <button type='button' onClick={clearForm}>
        clear
      </button>
      <button type='button' onClick={resetFrom}>
        reset
      </button>
    </form>
  );
}

export default ProductCreate;
