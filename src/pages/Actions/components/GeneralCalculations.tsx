import Table, { columnRowType } from '@/components/Table/Table';
import { typeEnum, typeEnumsAl } from '@/types/enums/typeEnum';
import { firstLetterUppercase } from '@/utils/general';
import './generalCalculations.scss';

interface GeneralCalculationsProps {
  data?: {
    [key: string]: any;
    key: string;
  };
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

const getRows = (data: GeneralCalculationsProps['data']) => {
  const total: { key: string; [key: string]: any } = {
    key: 'Bilanci',
    type: 'Bilanci',
  };

  const result = Object.keys(typeEnum).map((key) => {
    Object.keys(data?.currencies ?? {}).forEach((curr) => {
      total[curr] = total[curr] - (data?.[key][curr] ?? 0) || (data?.[key][curr] ?? 0);
    });
    return {
      key,
      type: typeEnumsAl[key as unknown as keyof typeof typeEnum],
      ...(data?.[key] && { ...(data[key] as Object) }),
    };
  });

  return { rows: result, total };
};

const GeneralCalculations = ({ data }: GeneralCalculationsProps) => {
  if (!data) return null;

  const columns = getColumns(data);
  const { rows, total } = getRows(data);

  return (
    <div className='generalCalculations'>
      <Table
        columns={columns}
        rows={rows ?? []}
        bottomRows={[total]}
        exports={{ excel: true, pdf: true }}
        style={{ blockSize: 'unset' }}
        options={{tableTitle: "Bilanci i buxhetit"}}
      />
    </div>
  );
};

export default GeneralCalculations;
