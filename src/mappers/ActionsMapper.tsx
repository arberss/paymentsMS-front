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
          uniqueKey={row._id}
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
          uniqueKey={row._id}
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
          uniqueKey={row._id}
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
          uniqueKey={row._id}
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
          uniqueKey={row._id}
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
          uniqueKey={row._id}
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
          uniqueKey={row._id}
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
          uniqueKey={row._id}
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
          uniqueKey={row._id}
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
          uniqueKey={row._id}
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
          uniqueKey={row._id}
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
          uniqueKey={row._id}
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

  actions?.forEach(({ currency, type, amount }: IAction) => {
    values.currencies = {
      ...(values.currencies ?? {}),
      [currency]: currency,
    };

    values[type] = {
      ...(values[type] ?? {}),
      [currency]: values?.[type]?.[currency] + amount || amount,
    };
  });

  return values;
};

export const calculateAmountsByYear = (
  actions: IAction[]
): { [key: string]: any; key: string } => {
  const result: { [key: string]: any; key: string } = actions.reduce(
    (
      acc: { [key: string]: any; key: string },
      { currency, amount, payedForYear, type }
    ) => {
      if (!acc[payedForYear]) {
        acc[payedForYear] = {};
      }
      if (!acc[payedForYear][currency]) {
        acc[payedForYear][currency] = 0;
      }

      if (!acc['currencies']) {
        acc['currencies'] = {};
      }
      if (!acc['currencies'][currency]) {
        acc['currencies'][currency] = currency;
      }

      if (!acc['years']) {
        acc['years'] = {};
      }
      if (!acc['years'][payedForYear]) {
        acc['years'][payedForYear] = payedForYear;
      }

      if (type === typeEnum.expense) {
        acc[payedForYear][currency] -= amount;
      } else {
        acc[payedForYear][currency] += amount;
      }

      return acc;
    },
    { key: 'calcByYear' }
  );

  return result;
};
