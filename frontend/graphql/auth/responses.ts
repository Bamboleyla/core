export interface ICreateUser_response {
  AUTH_createUser: { access_token: string };
}

export interface ILogIn_response {
  AUTH_logIn: { access_token: string };
}

export interface IGetToken_response {
  AUTH_token: boolean;
}
