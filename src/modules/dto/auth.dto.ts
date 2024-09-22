export type RegisterDto = {
  email: string;
  username: string;
  password: string;
  name: string;
  birthdate?: Date | null;
};

export type LoginDto = {
  userSession: string;
  password: string;
};
