import Table, { columnRowType } from '@/components/Table/Table';
import { firstLetterUppercase } from '@/utils/general';
import './generalCalculations.scss';

export enum Operators {
  '+' = '+',
  '-' = '-',
}

interface GeneralCalculationsProps {
  data?: {
    [key: string]: any;
    key: string;
  };
  tableTitle: string;
  types: { [key: string]: any };
  typeName: { [key: string]: any };
  operator?: Operators;
}

const getColumns = (data: GeneralCalculationsProps['data']) => {
  const statisData = {
    key: 'type',
    name: 'Tipi',
    summaryFormatter() {
      return <>Bilanci</>;
    },
  };

  const result =
    data &&
    Object.keys(data['currencies'] ?? {}).map((key) => {
      return {
        key: key,
        name: firstLetterUppercase(key),
        headerRenderer: ({ column }: { column: columnRowType }) => column?.name,
        formatter: ({
          column,
          row,
        }: {
          column: columnRowType;
          row: columnRowType;
        }) => row[column?.key] ?? 0,
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

  return [statisData, ...(result as [])];
};

const getRows = (
  data: GeneralCalculationsProps['data'],
  types: { [key: string]: any },
  typeName: { [key: string]: any },
  operator: Operators
) => {
  const total: { key: string; [key: string]: any } = {
    key: 'Bilanci',
    type: 'Bilanci',
  };

  const result = Object.keys(types).map((key) => {
    Object.keys(data?.currencies ?? {}).forEach((curr) => {
      if (operator === Operators['+']) {
        total[curr] = Math.abs(
          total[curr] + (data?.[key]?.[curr] ?? 0) || (data?.[key][curr] ?? 0)
        );
      } else {
        total[curr] =
          total[curr] - (data?.[key]?.[curr] ?? 0) || (data?.[key][curr] ?? 0);
      }
    });
    return {
      key,
      type: typeName[key],
      ...(data?.[key] && { ...(data[key] as Object) }),
    };
  });

  return { rows: result, total };
};

const GeneralCalculations = ({
  data,
  tableTitle,
  types,
  typeName,
  operator = Operators['-'],
}: GeneralCalculationsProps) => {
  if (!data) return null;

  const columns = getColumns(data);
  const { rows, total } = getRows(data, types, typeName, operator);

  return (
    <div className='generalCalculations'>
      <Table
        columns={columns}
        rows={rows ?? []}
        bottomRows={[total]}
        exports={{ excel: true, pdf: true }}
        style={{ blockSize: 'unset' }}
        options={{ tableTitle: tableTitle }}
      />
    </div>
  );
};

export default GeneralCalculations;
