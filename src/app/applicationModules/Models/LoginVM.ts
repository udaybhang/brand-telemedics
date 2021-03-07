export class LoginVM {
  UserName!: string;
  Password!: string;
  ClinicIdentifier!: string;
  ClinicId!: number;
}

export class RefreshTokenModel{
  accessToken!: string;
  refreshToken!: string;
}
