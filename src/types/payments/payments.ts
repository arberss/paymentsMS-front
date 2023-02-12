import { IUser } from '../user/user';

export interface IPayment {
  _id?: string;
  amount: number | undefined;
  exchange: string;
  householdHeader?: string;
  nrOfPersons: number;
  payedForYear: number;
  payer: string;
  paymentDate: Date;
  paymentReceiver: string;
  reason: string;
  type: string;
}

export interface IPaymentsUser {
  payments: IPayment[];
  user: IUser;
  totalPayed?: number;
}
