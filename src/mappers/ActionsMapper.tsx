import TableSelectedColumn from '@/components/Table/components/TableSelectedColumn/TableSelectedColumn';
import { columnRowType } from '@/components/Table/Table';
import { IAction } from '@/types/actions/actions';
import { currencyEnums, typeEnum, typeEnumsAl } from '@/types/enums/typeEnum';
import { IMapperProps, IMapperValues } from '@/types/mappers/mappers';
import moment from 'moment';

export const ActionMappers = ({
  data: actions,
  clickedRowId,
  showFooterTotal = true,
}: IMapperProps<IAction[]>): IMapperValues => {
  const columns = [
    {
      key: 'user',
      name: 'Personi/Kompania/Tjeter',
      frozen: true,
      resizable: true,
      formatter: ({
        column,
        row,
      }: {
        column: columnRowType;
        row: columnRowType;
      }) => (
        <TableSelectedColumn
          clickedRowId={clickedRowId}
          value={row?.[column?.key]}
          uniqueKey={row.invoiceNr}
        />
      ),
    },
    {
      key: 'type',
      name: 'Tipi',
      resizable: true,
      formatter: ({
        column,
        row,
      }: {
        column: columnRowType;
        row: columnRowType;
      }) => (
        <TableSelectedColumn
          clickedRowId={clickedRowId}
          value={row?.[column?.key]}
          uniqueKey={row.invoiceNr}
        />
      ),
    },
    {
      key: 'reason',
      name: 'Emërtimi',
      resizable: true,
      formatter: ({
        column,
        row,
      }: {
        column: columnRowType;
        row: columnRowType;
      }) => (
        <TableSelectedColumn
          clickedRowId={clickedRowId}
          value={row?.[column?.key]}
          uniqueKey={row.invoiceNr}
        />
      ),
    },
    {
      key: 'amount',
      name: 'Shuma',
      resizable: true,
      formatter: ({
        column,
        row,
      }: {
        column: columnRowType;
        row: columnRowType;
      }) => (
        <TableSelectedColumn
          clickedRowId={clickedRowId}
          value={row?.[column?.key]}
          uniqueKey={row.invoiceNr}
        />
      ),
    },
    {
      key: 'description',
      name: 'Sqarim',
      resizable: true,
      formatter: ({
        column,
        row,
      }: {
        column: columnRowType;
        row: columnRowType;
      }) => (
        <TableSelectedColumn
          clickedRowId={clickedRowId}
          value={row?.[column?.key]}
          uniqueKey={row.invoiceNr}
        />
      ),
    },
    {
      key: 'payedForMonth',
      name: 'Në muajin',
      resizable: true,
      formatter: ({
        column,
        row,
      }: {
        column: columnRowType;
        row: columnRowType;
      }) => (
        <TableSelectedColumn
          clickedRowId={clickedRowId}
          value={row?.[column?.key]}
          uniqueKey={row.invoiceNr}
        />
      ),
    },
    {
      key: 'payedForYear',
      name: 'Për vitin',
      resizable: true,
      formatter: ({
        column,
        row,
      }: {
        column: columnRowType;
        row: columnRowType;
      }) => (
        <TableSelectedColumn
          clickedRowId={clickedRowId}
          value={row?.[column?.key]}
          uniqueKey={row.invoiceNr}
        />
      ),
    },
    {
      key: 'exchange',
      name: 'Kursi',
      resizable: true,
      formatter: ({
        column,
        row,
      }: {
        column: columnRowType;
        row: columnRowType;
      }) => (
        <TableSelectedColumn
          clickedRowId={clickedRowId}
          value={row?.[column?.key]}
          uniqueKey={row.invoiceNr}
        />
      ),
    },
    {
      key: 'invoiceNr',
      name: 'Nr. i faktures',
      resizable: true,
      formatter: ({
        column,
        row,
      }: {
        column: columnRowType;
        row: columnRowType;
      }) => (
        <TableSelectedColumn
          clickedRowId={clickedRowId}
          value={row?.[column?.key]}
          uniqueKey={row.invoiceNr}
        />
      ),
    },
    {
      key: 'payer',
      name: 'Pagesën e kreu',
      resizable: true,
      formatter: ({
        column,
        row,
      }: {
        column: columnRowType;
        row: columnRowType;
      }) => (
        <TableSelectedColumn
          clickedRowId={clickedRowId}
          value={row?.[column?.key]}
          uniqueKey={row.invoiceNr}
        />
      ),
    },
    {
      key: 'paymentReceiver',
      name: 'Pagesën e pranoi',
      resizable: true,
      formatter: ({
        column,
        row,
      }: {
        column: columnRowType;
        row: columnRowType;
      }) => (
        <TableSelectedColumn
          clickedRowId={clickedRowId}
          value={row?.[column?.key]}
          uniqueKey={row.invoiceNr}
        />
      ),
    },
    {
      key: 'paymentDate',
      name: 'Data e pagesës',
      resizable: true,
      formatter: ({
        column,
        row,
      }: {
        column: columnRowType;
        row: columnRowType;
      }) => (
        <TableSelectedColumn
          clickedRowId={clickedRowId}
          value={row?.[column?.key]}
          uniqueKey={row.invoiceNr}
        />
      ),
    },
  ];

  const rows = actions?.map((action: IAction) => {
    return {
      ...action,
      key: action.invoiceNr,
      type: typeEnumsAl[action.type as unknown as keyof typeof typeEnum],
      paymentDate: moment(action.paymentDate).format('DD MMMM, YYYY'),
      payedForMonth: moment().month(2).format('MMMM'),
      amount: `${action.amount} ${
        currencyEnums[action.currency as unknown as keyof typeof currencyEnums]
          ? currencyEnums[
              action.currency as unknown as keyof typeof currencyEnums
            ]
          : action.currency
      }`,
    };
  });

  return {
    columns,
    rows,
    bottomRows: showFooterTotal ? calculateAmounts(actions) : undefined,
  };
};

const calculateAmounts = (actions: IAction[]) => {
  const values: { key: string; [key: string]: any } = {
    key: '',
    isFooter: true,
  };

  actions?.forEach((action: IAction) => {
    values['currencies'] = {
      ...(values['currencies'] ?? {}),
      [action.currency]: action.currency,
    };

    values[action.type] = {
      ...(values[action.type] ?? {}),
      [action.currency]:
        values?.[action.type]?.[action.currency] + action.amount ||
        action.amount,
    };
  });

  return values;
};
