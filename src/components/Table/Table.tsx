import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import ColumnActions, { Actions } from './Actions/TableActions';
import ExportActions from './Export/ExportActions';
import './table.scss';

export type columnRowType = { [key: string]: any };

interface TableProps {
  columns: { key: string; name: string }[];
  rows: { key: string; [key: string]: string | number | undefined }[];
  onRowClick?: (column: columnRowType, row: columnRowType) => void;
  onRowDoubleClick?: (column: columnRowType, row: columnRowType) => void;
  exports?: { pdf?: boolean; excel?: boolean; csv?: boolean };
  actions?: (({ rowData }: { rowData?: { [key: string]: any } }) => Actions)[];
  options?: {
    actionColumn?: {
      frozen?: boolean;
      width?: number;
      position?: 'left' | 'right';
    };
  };
  bottomRows?: { key: string; [key: string]: string | number }[] | null;
}

const Table = ({
  columns,
  rows,
  onRowClick,
  onRowDoubleClick,
  exports,
  actions,
  options,
  bottomRows
}: TableProps) => {
  let customColumns = [...columns];

  if (actions) {
    const tableActions = [
      {
        key: 'actions',
        name: 'Veprimet',
        frozen: options?.actionColumn?.frozen,
        width: options?.actionColumn?.width,
        headerRenderer: ({ column }: { column: columnRowType }) => column?.name,
        formatter: ({ row }: { row: any }): JSX.Element => (
          <div className='tableGrid__actions'>
            <ColumnActions rowData={row} actions={actions} />
          </div>
        ),
      },
    ];

    if (options?.actionColumn?.position === 'left') {
      customColumns.push(...tableActions);
    } else {
      customColumns = [...tableActions, ...customColumns];
    }
  }

  const gridElement = (
    <DataGrid
      className='rdg-light tableGrid'
      columns={customColumns}
      rows={rows}
      onRowDoubleClick={onRowDoubleClick}
      onRowClick={onRowClick}
      bottomSummaryRows={bottomRows}
    />
  );

  return (
    <>
      {exports && <ExportActions table={gridElement} exports={exports} />}
      {gridElement}
    </>
  );
};

export default Table;
