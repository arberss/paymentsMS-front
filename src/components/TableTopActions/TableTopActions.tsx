import { Button, Sx } from '@mantine/core';
import { IconFilePlus } from '@tabler/icons-react';
import './tableTopActions.scss';

interface TableTopActionsProps {
  title: string;
  onClick?: () => void;
  sx?: Sx;
}

const TableTopActions = ({ title, onClick, sx }: TableTopActionsProps) => {
  return (
    <div className='tableTopActions'>
      <Button
        leftIcon={<IconFilePlus size={18} />}
        onClick={onClick}
        className='tableTopActions__button'
        sx={sx}
      >
        {title}
      </Button>
    </div>
  );
};

export default TableTopActions;
