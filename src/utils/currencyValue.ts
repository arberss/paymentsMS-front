import axios from 'axios';

export const getCurrencyValue = async () => {
  const { CURRENCY_API_URL, CURRENCY_API_KEY } = process.env;
  const value = await axios.get(
    `${CURRENCY_API_URL}?apikey=${CURRENCY_API_KEY}&value=1&base_currency=EUR&currencies=RSD`
  );
  return value;
};
