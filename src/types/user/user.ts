export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  personalNumber: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: string;
  status?: string;
}
