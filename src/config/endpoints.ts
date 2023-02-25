export const endpoints = {
  login: '/auth/signin',
  statuses: '/statuses',
  addStatus: '/statuses',
  payments: '/payments',
  addPayment: '/payments/::userId',
  editPayment: '/payments/::userId/::paymentId',
  deletePayment: '/payments/delete/::paymentId',
  users: '/user/all',
};
