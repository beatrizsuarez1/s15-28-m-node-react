import { FormRegister } from "../types";

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const onKeyNumbers = (e: React.KeyboardEvent): void => {
  if (!/^([0-9])*$/.test(e.key) && e.key !== "Backspace") {
    e.preventDefault();
  }
};

export const formatRegisterData = (data: FormRegister): Omit<FormRegister, 'confirmPassword'> => {
  const { confirmPassword, ...formatDate } = data
  return formatDate
}