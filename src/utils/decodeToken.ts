import jwt_decode from 'jwt-decode';
import moment from 'moment';

export const decodeToken = (): { [key: string]: any } | null => {
  const token = localStorage.getItem('token');
  if (token === null) return null;

  const decoded: { [key: string]: any } | null = jwt_decode(token);
  const expireDate = decoded?.exp;
  const momentDate = moment().unix();
  if (expireDate && expireDate < momentDate) {
    return null;
  }

  return decoded;
};
