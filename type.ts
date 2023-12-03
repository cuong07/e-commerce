export type ActionType = {
  title: string;
  link: string;
  type: string;
};

export type UserLoginType = {
  phone_number: string;
  password: string;
};

export type UserRegisterType = {
  fullname: string;
  password: string;
  retype_password: string;
  role_id: number;
  address: string;
  facebook_account_id: number;
  google_account_id: number;
  date_of_birth: Date;
  phone_number: string;
};

export type ProductData = {
  name: string;
  price: number;
  thumbnail: string;
  description: string;
  categori_id: string;
  url: string;
};
