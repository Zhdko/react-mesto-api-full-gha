import { useState } from "react";

function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: e.target.validationMessage }));
  }

  function defaultValues(values = {}, errors = {}) {
    setValues(values);
    setErrors(errors);
  }

  return { values, errors, handleChange, defaultValues };
}

export default useValidation;
