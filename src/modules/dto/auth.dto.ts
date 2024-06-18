export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  birthdate: Date;
}

export interface LoginDto {
  email: string;
  password: string;
}
