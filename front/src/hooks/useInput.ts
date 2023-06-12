import { useState, useCallback, ChangeEvent } from "react";

type InputValue = string;
type InputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

export const useInput = (
  initialValue: InputValue = ""
): [InputValue, InputChangeHandler] => {
  const [value, setValue] = useState<InputValue>(initialValue);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  return [value, handleChange];
};
