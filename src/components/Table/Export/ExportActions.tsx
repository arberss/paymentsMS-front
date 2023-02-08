import { Button, Flex } from '@mantine/core';
import { exportToCsv, exportToPdf, exportToXlsx } from './exportUtils';

interface IExportActions {
  table: JSX.Element;
  exports?: { pdf?: boolean; excel?: boolean; csv?: boolean };
}

const ExportActions = ({ table, exports }: IExportActions) => {
  return (
    <Flex style={{ margin: '10px 0 5px 0' }} columnGap={5} justify='flex-end'>
      {exports?.excel && (
        <Button
          compact
          variant='default'
          color='green'
          onClick={async () => exportToXlsx(table, 'CommonFeatures.xlsx')}
        >
          Excel
        </Button>
      )}
      {exports?.csv && (
        <Button
          compact
          variant='default'
          color='green'
          onClick={async () => exportToCsv(table, 'CommonFeatures.csv')}
        >
          Csv
        </Button>
      )}
      {exports?.pdf && (
        <Button
          compact
          variant='default'
          color='green'
          onClick={async () => exportToPdf(table, 'CommonFeatures.pdf')}
        >
          Pdf
        </Button>
      )}
    </Flex>
  );
};

export default ExportActions;
