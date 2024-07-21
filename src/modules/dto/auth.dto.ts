export class RegisterDto {
  declare email: string;
  declare username: string;
  declare password: string;
  declare name: string;
  declare birthdate?: Date | null;
}

export class LoginDto {
  declare userSession: string;
  declare password: string;
}
