import NavbarHeader from '@/components/Navbar/NavbarHeader';
import Table from '@/components/Table/Table';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import { endpoints } from '@/config/endpoints';
import { useQuery } from '@/hooks/useQuery';
import { useAppSelector } from '@/store/hooks';
import { StatusActionType } from '@/types/statuses/statuses';
import { useState } from 'react';
import AddStatus from './create/AddStatus';

const columns = [
  { key: 'name', name: 'Emri' },
  { key: 'users', name: 'Numri i personave' },
];

const Statuses = () => {
  const { data: statuses = [] } = useQuery<
    {
      [key: string]: string | number | undefined;
      key: string;
    }[]
  >(endpoints.statuses);

  const {
    // statuses: { statuses },
    addStatus: { loading },
  } = useAppSelector((state) => state.statuses);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <NavbarHeader title='Statuset' color='dark' />
      <TableTopActions
        title='Shto status'
        onClick={() => handleModal()}
        sx={{ marginBottom: 10 }}
      />
      <Table
        columns={columns}
        rows={statuses}
        exports={{ excel: true, pdf: true }}
      />
      <AddStatus
        title='Shto status'
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        action={StatusActionType.add}
        loading={loading}
      />
    </>
  );
};

export default Statuses;
