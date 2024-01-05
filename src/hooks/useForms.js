import { useState } from 'react';

// a custome Hook to <form>
export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setFormState((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const onResetForm = () => setFormState(initialForm);

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  };
};
