import { typeEnum } from '../enums/typeEnum';

export interface IAction {
  _id?: string;
  user: string;
  amount: number;
  exchange: string;
  currency: string;
  invoiceNr: string;
  nrOfPersons: number;
  payedForYear: number;
  payedForMonth: number;
  payer: string;
  paymentDate: Date;
  paymentReceiver: string;
  reason: string;
  description: string;
  type: typeEnum;
}