export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  birthdate?: Date;
}

export interface UpdateUserDto {
  name: string;
  birthdate?: Date;
}
