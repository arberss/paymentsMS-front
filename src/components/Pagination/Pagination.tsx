import { Pagination as MantinePagination } from '@mantine/core';
import './pagination.scss';

interface PaginationProps {
  activePage: number | undefined;
  size: number | undefined;
  totalPages: number | undefined;
  onChange: ((value: number) => void) | undefined;
}

const Pagination = ({
  activePage,
  size,
  totalPages,
  onChange,
}: PaginationProps) => {
  if (!totalPages) return null;

  return (
    <MantinePagination
      className='pagination'
      total={Math.ceil(totalPages / (size ?? 1))}
      page={activePage}
      boundaries={1}
      siblings={0}
      onChange={onChange}
    />
  );
};

export default Pagination;
