export interface IMenu {
  id: number;
  title: string;
  href: string;
  icon?: string;
}

export interface IUser {
  id: any;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
