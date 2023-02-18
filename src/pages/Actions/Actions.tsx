import Loader from '@/components/Loader/Loader';
import NavbarHeader from '@/components/Navbar/NavbarHeader';
import Table, { columnRowType } from '@/components/Table/Table';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import { ActionMappers } from '@/mappers/ActionsMapper';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getActions, setPage } from '@/store/slices/actions/actionsSlice';
import { actionsEnum } from '@/types/enums/typeEnum';
import { useEffect, useState } from 'react';
import GeneralCalculations from './components/GeneralCalculations';
import AddAction from './create/AddAction';

const Actions = () => {
  const dispatch = useAppDispatch();
  const {
    actions: {
      actions,
      loading,
      pagination: { page, size, totalPages },
    },
  } = useAppSelector((state) => state.actions);

  const [actionModal, setActionModal] = useState<actionsEnum | null>(null);
  const [clickedRowId, setClickedRowId] = useState<string | undefined>(
    undefined
  );

  const { rows, columns, bottomRows } = ActionMappers({
    data: actions,
    clickedRowId,
  });

  const tableOptions = {
    tableTitle: 'Hyrjet dhe daljet ne buxhet',
    pagination: {
      activePage: page,
      size,
      totalPages,
      onChange: (selectedNumber: number) => {
        dispatch(setPage(selectedNumber));
      },
    },
  };

  useEffect(() => {
    dispatch(getActions({ pagination: { page, size } }));
  }, [page]);

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
    <>
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
      />
      <GeneralCalculations data={bottomRows} />
      <AddAction
        title='Shto veprim'
        isOpen={Boolean(actionModal)}
        onClose={handleCloseModal}
        action={actionModal ?? actionsEnum.add}
      />
    </>
  );
};

export default Actions;
