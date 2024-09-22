export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  birthdate?: Date | null;
};

export type UpdateUserDto = {
  name: string;
  birthdate?: Date | null;
};
