export type CreateUserType = {
  username: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  full_name: string | undefined;
  email: string | undefined;
  mobile_number: string | undefined;
  password: string | undefined;
  verify_password: string | undefined;
  provider: string | undefined;
};

export type CreateUserValidateType = {
  username: boolean;
  first_name: boolean;
  last_name: boolean;
  email: boolean;
  password: boolean;
  verify_password: boolean;
};

export type LoginUserType = {
  email: string | undefined;
  password: string | undefined;
};

export type LoginUserValidateType = {
  email: boolean;
  password: boolean;
};
