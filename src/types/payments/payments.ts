import { IUser } from '../user/user';

export interface IPayment {
  _id?: string;
  amount: number;
  exchange: string;
  householdHeader?: string;
  payedForYear: number;
  payer: string;
  paymentDate: Date;
  paymentReceiver: string;
  reason: string;
}

export interface IPaymentsUser {
  payments: IPayment[];
  user: IUser;
  totalPayed?: number;
}
