export const sizeFilter = [
  {
    label: '10',
    value: '10',
  },
  {
    label: '50',
    value: '50',
  },
  {
    label: '100',
    value: '100',
  },
];

export const calculatePages = (totalPages: number, size: number) => {
  return Math.ceil(totalPages / (size ?? 1));
};
