export interface ICreateProject {
  name: string;
  description: string;
  email_client: string;
  price_hour: number;
}

export interface IDataType {
  name: string;
  client: string;
  date_in: string;
  date_out: string;
  status: string;
  email_client: string;
  description?: string;
}
