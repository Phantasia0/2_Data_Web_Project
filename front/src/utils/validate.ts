export const validatePassword = (password: string) => password.length >= 4;
export const validateName = (name: string) => name.length >= 2;

export const validateId = (id: string) => id.length >= 2;

export const validateTwoPassword = (
  password: string,
  confirmPassword: string
) => password === confirmPassword;

export const validateRegisterForm = (
  id: string,
  name: string,
  password: string,
  confirmPassword: string
) =>
  validateId(id) &&
  validateName(name) &&
  validatePassword(password) &&
  validateTwoPassword(password, confirmPassword);

export const validateLoginForm = (
  name: string,
  password: string,
  confirmPassword: string
) => validateName(name) && validatePassword(password);

export const SKIPCOUNT = 12;
