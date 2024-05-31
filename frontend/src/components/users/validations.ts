// validations.ts

export const validateName = (name: string): boolean => {
    const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{2,30}$/;
    return regex.test(name) && name.trim() === name && !name.includes('  ');
  };
  
  export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) && email.length >= 6 && email.length <= 255;
  };
  
  export const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,30}$/;
    return regex.test(password);
  };
  
  export const validatePhone = (phone: string): boolean => {
    const regex = /^[\d\s+-]{8,16}$/;
    return regex.test(phone);
  };
  
  export const validateBirthDate = (date: string): boolean => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18 && age - 1 < 99;
    }
    return age >= 18 && age < 99;
  };
  