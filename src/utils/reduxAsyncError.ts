export const returnError = (error: { [key: string]: any }) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  return error.message;
};
