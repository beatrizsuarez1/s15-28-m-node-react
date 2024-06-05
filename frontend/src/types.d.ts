enum UserRole {
    Freelance = 'freelance',
    Cliente = 'cliente'
  }

export interface FormRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
    birthDate: string;
    phone: string;
  }
export type FormLogin = {
    email: string,
    password: string,
  }