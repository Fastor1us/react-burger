import { useState, ChangeEvent } from 'react';

type TValues = {
  [key: string]: string;
}

export function useForm(inputValues = {}) {
  const [values, setValues] = useState<TValues>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, setValues, handleChange };
}
