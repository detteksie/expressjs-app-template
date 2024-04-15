export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  birthdate?: Date;
}

export interface UpdateUserRequest {
  name: string;
  birthdate?: Date;
}
