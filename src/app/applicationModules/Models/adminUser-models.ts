export class SuperAdminUserModel {
    id!: string;
    fullName!: string;
    createdOn!: Date;
    email!: string;
    roles: string[] = [];
  }
