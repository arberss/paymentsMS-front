import Loader from '@/components/Loader/Loader';
import NavbarHeader from '@/components/Navbar/NavbarHeader';
import Table, { columnRowType } from '@/components/Table/Table';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import { endpoints } from '@/config/endpoints';
import { usePagination } from '@/hooks/usePagination';
import { ActionMappers } from '@/mappers/ActionsMapper';
import { IAction } from '@/types/actions/actions';
import { actionsEnum } from '@/types/enums/typeEnum';
import { IPagination } from '@/types/pagination/pagination';
import { useEffect, useState } from 'react';
import GeneralCalculations from './components/GeneralCalculations';
import AddAction from './create/AddAction';

const Actions = () => {
  const [paginations, setPaginations] = useState({
    page: 1,
    size: 10,
    totalPages: 10,
  });

  const {
    data: actions = {
      data: [],
      pagination: {
        page: 1,
        size: 10,
        totalPages: 10,
      },
    },
    isLoading: loading,
    isSuccess,
    isFetching,
  } = usePagination<{ data: IAction[]; pagination: IPagination }>(
    endpoints.actions,
    paginations
  );

  const [actionModal, setActionModal] = useState<actionsEnum | null>(null);
  const [clickedRowId, setClickedRowId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (isSuccess) {
      setPaginations(actions.pagination);
    }
  }, [isSuccess]);

  const { rows, columns, bottomRows } = ActionMappers({
    data: actions.data,
    clickedRowId,
  });

  const tableOptions = {
    tableTitle: 'Hyrjet dhe daljet ne buxhet',
    pagination: {
      activePage: paginations.page,
      size: paginations.size,
      totalPages: paginations.totalPages,
      onChange: (selectedNumber: number) => {
        setPaginations({ ...paginations, page: selectedNumber });
      },
      onSizeChange: (selectedNumber: string) => {
        setPaginations({ ...paginations, page: 1, size: +selectedNumber });
      },
    },
  };

  const onRowClick = (column: columnRowType, row: columnRowType) => {
    setClickedRowId(column.invoiceNr);
  };

  const handleModal = (value: actionsEnum | null) => {
    setActionModal(value);
  };

  const handleCloseModal = () => {
    handleModal(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='relative'>
      <NavbarHeader title='Veprimet' color='dark' />
      <TableTopActions
        title='Shto veprim'
        onClick={() => handleModal(actionsEnum.add)}
        sx={{ marginBottom: 10 }}
      />
      <Table
        columns={columns}
        rows={rows ?? []}
        onRowClick={onRowClick}
        exports={{ excel: true, pdf: true }}
        options={tableOptions}
        style={{ blockSize: 400 }}
        onOutsideClick={() => {
          setClickedRowId('');
        }}
      />
      <GeneralCalculations data={bottomRows} />
      <AddAction
        title='Shto veprim'
        isOpen={Boolean(actionModal)}
        onClose={handleCloseModal}
        action={actionModal ?? actionsEnum.add}
      />
      {isFetching && <Loader position='absolute' />}
    </div>
  );
};

export default Actions;
