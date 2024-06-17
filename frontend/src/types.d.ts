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
  signUp: (data: FRWithoutConfirm) => Promise<void>;
  login: (data: FormLogin) => Promise<void>;
}


export interface User {
  id: string;
  username: string;
  email: string;

}
export interface AuthContextType {
  user: User | null;
  // login: (data: FormLogin) => Promise<void>;
  // signUp: (data: FRWithoutConfirm) => Promise<void>;
  logout: Function;
  isAuthenticated: any;
  setCookie: Function
}

export interface stateSideBarProps {
  open: boolean ,
  handleChangeOfStatus: () => void

}