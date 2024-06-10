export interface ICreateProject {
  name: string;
  description: string;
  email_client: string;
  price_hour: number;
}

export interface IShowProject {
  name: string,
  email_client: string,
  init_date: null,
  end_date: null,
  is_completed: boolean,
  price_hour: string
}

export interface IProjectResponse {
  uuid?:            string;
  init_date:       null;
  end_date:        null;
  name:            string;
  price_hour:      string;
  description?:     string;
  id_cliente?:      null | string;
  email_client:    string;
  is_completed:    boolean;
  is_active?:       boolean;
  status_uuid?:     string;
  custom_label_id?: null;
  user_uuid?:       string;
}
