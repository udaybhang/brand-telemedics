export class NavigationItemModel {
  public name!: string;
  public icon!: string;
  public routerLink!: string;
  public canAccessUserType!: number;
  public sortOrder!: number;
  public accessRoles:string[]=[];
}
