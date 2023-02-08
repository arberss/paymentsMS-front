import { columnRowType } from '@/components/Table/Table';

interface PaymentColumnProps {
  column: columnRowType;
  row: columnRowType;
  clickedRowId?: string;
}

const PaymentColumn = ({ column, row, clickedRowId }: PaymentColumnProps) => {
  const value = row?.[column?.key];
  const clickedRowStyle =
    clickedRowId === row.userPaymentsId ? 'tableGrid__row--clicked' : '';
  return (
    <div
      className={`tableGrid__row ${
        !value ? 'tableGrid__row--empty' : ''
      } ${clickedRowStyle}`}
    >
      {value}
    </div>
  );
};

export default PaymentColumn;
