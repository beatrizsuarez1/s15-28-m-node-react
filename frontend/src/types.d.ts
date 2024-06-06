export enum UserRole {
  Freelance = 1,
  Cliente = 2
}

export interface FormRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role_id: UserRole;
  birthdate: string;
  phone: string;
}
export type FormLogin = {
  email: string,
  password: string,
}
export type FRWithoutConfirm = Omit<FormRegister, 'confirmPassword'>;

export interface useRequestType {
  registerUser: (data: FRWithoutConfirm) => Promise<void>;
  loginUser: (data: FormLogin) => Promise<void>;
}
