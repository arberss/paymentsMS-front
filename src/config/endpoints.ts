export const endpoints = {
  login: '/auth/signin',
  register: '/auth/signup',
  statuses: '/statuses',
  addStatus: '/statuses',
  payments: '/payments',
  addPayment: '/payments/::userId',
  editPayment: '/payments/::userId/::paymentId',
  deletePayment: '/payments/delete/::paymentId',
  users: '/user/all',
  actions: '/actions',
  addAction: '/actions',
};
