interface TableSelectedColumnProps {
  clickedRowId?: string;
  value: string | number;
  uniqueKey: string | number;
}

const TableSelectedColumn = ({
  clickedRowId,
  value,
  uniqueKey,
}: TableSelectedColumnProps) => {
  const clickedRowStyle =
    clickedRowId === uniqueKey ? 'tableGrid__row--clicked' : '';
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

export default TableSelectedColumn;
