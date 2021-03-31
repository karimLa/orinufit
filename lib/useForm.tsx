import { ChangeEvent, useState } from 'react';

function useForm<T>(initial: T = {} as T) {
  const [inputs, setInputs] = useState(initial);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let { name, value, type } = e.target;

    if (value && type === 'number') {
      // @ts-ignore
      value = parseInt(value, 10);
    }

    if (value && type === 'file') {
      // @ts-ignore
      [value] = e.target.files;
    }

    setInputs((state) => ({ ...state, [name]: value }));
  }

  function resetFrom() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.entries(inputs).map(([key, value]) => [
      key,
      typeof value === 'number' ? 0 : '',
    ]);

    setInputs(Object.fromEntries(blankState));
  }

  return { inputs, onChange, resetFrom, clearForm };
}

export default useForm;
