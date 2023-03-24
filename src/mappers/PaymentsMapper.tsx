import TableSelectedColumn from '@/components/Table/components/TableSelectedColumn/TableSelectedColumn';
import { columnRowType } from '@/components/Table/Table';
import { IMapperProps, IMapperValues } from '@/types/mappers/mappers';
import { IPayment, IPaymentsUser } from '@/types/payments/payments';
import { IUser } from '@/types/user/user';
import moment from 'moment';

type PaymentsType = IPaymentsUser & { _id: string };

export const PaymentsMapper = ({
  data: payments,
  clickedRowId,
  showFooterTotal = true,
}: IMapperProps<PaymentsType[]>): IMapperValues => {
  const staticColumns: { key: string; name: string; [key: string]: any }[] = [
    {
      key: 'name',
      name: 'Emri',
      width: 200,
      resizable: true,
      frozen: true,
      headerRenderer: ({ column }: { column: columnRowType }) => (
        <div className='tableGrid__column'>{column?.name}</div>
      ),
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
          uniqueKey={row.userPaymentsId}
        />
      ),
      summaryFormatter() {
        return <>Totali</>;
      },
    },
    {
      key: 'personalNumber',
      name: 'Numri personal',
      width: 150,
      resizable: true,
      headerRenderer: ({ column }: { column: columnRowType }) => (
        <div className='tableGrid__column'>{column?.name}</div>
      ),
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
          uniqueKey={row.userPaymentsId}
        />
      ),
    },
    {
      key: 'status',
      name: 'Lagja',
      width: 150,
      resizable: true,
      headerRenderer: ({ column }: { column: columnRowType }) => (
        <div className='tableGrid__column'>{column?.name}</div>
      ),
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
          uniqueKey={row.userPaymentsId}
        />
      ),
    },
  ];

  const lastStaticColumns: { key: string; name: string; [key: string]: any }[] =
    [
      {
        key: 'totalPayed',
        name: 'Totali',
        width: 150,
        resizable: true,
        headerRenderer: ({ column }: { column: columnRowType }) => (
          <div className='tableGrid__column'>{column?.name}</div>
        ),
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
            uniqueKey={row.userPaymentsId}
          />
        ),
        summaryFormatter({
          row,
          column,
        }: {
          column: columnRowType;
          row: columnRowType;
        }) {
          return <>{row[column.key]}</>;
        },
      },
    ];

  const years: number[] = [];
  payments?.forEach((payment: { payments: IPayment[] }) => {
    return payment.payments?.forEach((pay: IPayment) => {
      if (!years.includes(pay.payedForYear)) {
        years.push(pay.payedForYear);
      }
    });
  });

  const sortedYears = years.sort((x, y) => x - y);
  const minYear =
    sortedYears.length > 0
      ? Math.min(...sortedYears)
      : moment().add(-1, 'years').year();
  const maxYear =
    sortedYears.length > 0 ? Math.max(...sortedYears) : moment().year();

  const diff = maxYear - minYear;
  const allYears: number[] = Array.from({ length: diff + 1 }).map(
    (_, index) => {
      return minYear + index;
    }
  );

  const columns = allYears.map((year) => {
    return {
      key: year.toString(),
      name: year.toString(),
      headerRenderer: ({ column }: { column: columnRowType }) => column?.name,
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
          uniqueKey={row.userPaymentsId}
        />
      ),
      summaryFormatter({
        row,
        column,
      }: {
        column: columnRowType;
        row: columnRowType;
      }) {
        return <>{row[column.key]}</>;
      },
    };
  });

  const mappedRows: { key: string; [key: string]: any }[] = [];
  payments?.forEach(
    (payment: {
      _id: string;
      payments: IPayment[];
      user: IUser;
      totalPayed?: number;
    }) => {
      if (payment.payments.length < 1) {
        mappedRows.push({
          key: payment.user.personalNumber,
          userPaymentsId: payment._id,
          personalNumber: payment.user.personalNumber,
          name: `${payment.user.firstName} ${payment.user.lastName}`,
          status:
            typeof payment.user.status === 'string'
              ? payment.user.status
              : payment.user.status.name,
        });
      }

      payment.payments.forEach((pay: IPayment) => {
        const findItemIndex = mappedRows.findIndex(
          (item: { [key: string]: any }) =>
            item.key === payment.user.personalNumber
        );

        if (findItemIndex !== -1) {
          mappedRows[findItemIndex] = {
            ...mappedRows[findItemIndex],
            [pay.payedForYear]: pay.amount,
            paymentIds: {
              ...mappedRows[findItemIndex].paymentIds,
              [pay.payedForYear]: pay._id,
            },
          };
        } else {
          mappedRows.push({
            key: payment.user.personalNumber,
            userPaymentsId: payment._id,
            personalNumber: payment.user.personalNumber,
            name: `${payment.user.firstName} ${payment.user.lastName}`,
            status:
              typeof payment.user.status === 'string'
                ? payment.user.status
                : payment.user.status.name,
            totalPayed: payment.totalPayed,
            [pay.payedForYear]: pay.amount,
            paymentIds: {
              [pay.payedForYear]: pay._id,
            },
          });
        }
      });
    }
  );

  return {
    columns: [...staticColumns, ...columns, ...lastStaticColumns] ?? [],
    rows: mappedRows ?? [],
    bottomRows: showFooterTotal ? calculateYearTotal(payments) : undefined,
  };
};

export const calculateYearTotal = (data: IPaymentsUser[]) => {
  const years: { key: string; [key: string]: any } = {
    key: '',
    isFooter: true,
  };

  data?.forEach((payment: IPaymentsUser) => {
    payment.payments.forEach((item) => {
      years[item.payedForYear] =
        years[item.payedForYear] + (item.amount || 0) || item.amount || 0;
      years['totalPayed'] = (years['totalPayed'] || 0) + (item.amount || 0);
    });
  });

  return years;
};
