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
  const { confirmPassword, ...formatDateNew } = data
  return formatDateNew
}

export const validateDate = (date:any) => {
  const today = new Date()
  const birthdate = new Date(formatDate(date))
  const age = today.getFullYear() - birthdate.getFullYear()

  if(age > 18) return true
  if(age > 99) return true

  return false
}

export const toLowerCase = (str: string) => str.toLowerCase();

export const formatName = (str: string) => {
  const names = str.split(' '); // Dividir el nombre completo en palabras individuales
  const formattedNames = names.map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
  return formattedNames.join(' '); // Unir los nombres formateados
};