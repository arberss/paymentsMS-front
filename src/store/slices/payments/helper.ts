import { IPaymentsUser } from '@/types/payments/payments';

export const paymentUpdater = (
  payments: IPaymentsUser[],
  payload: {
    data: IPaymentsUser;
    userId: string;
  }
) => {
  return payments.map((userPayments) => {
    if (userPayments.user._id === payload.userId) {
      return payload.data;
    }
    return userPayments;
  });
};
