export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  birthdate: Date;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}
