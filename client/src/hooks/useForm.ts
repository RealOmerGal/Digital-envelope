import { useState } from "react";

export const useForm = <T>(callback: () => void, initialState: T) => {
  const [values, setValues] = useState(initialState);

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  const clearForm = () => {
    setValues((prev) => initialState);
  }

  return { onChange, onSubmit, values, clearForm };
};
