import { Flex, Text } from '@mantine/core';
import ExportActions from '../../export/ExportActions';

interface TableHeaderProps {
  table: JSX.Element;
  options?: {
    exports?: { pdf?: boolean; excel?: boolean; csv?: boolean };
    title?: string;
  };
}

const TableHeader = ({ table, options }: TableHeaderProps) => {
  return (
    <Flex align='center' justify='space-between'>
      <Flex>{options?.title && <Text size={14}>{options?.title}</Text>}</Flex>
      <Flex>
        {options?.exports && <ExportActions table={table} exports={options?.exports} />}
      </Flex>
    </Flex>
  );
};

export default TableHeader;
