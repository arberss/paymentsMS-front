import Loader from '@/components/Loader/Loader';
import NavbarHeader from '@/components/Navbar/NavbarHeader';
import Table, { columnRowType } from '@/components/Table/Table';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import { ActionMappers } from '@/mappers/Actions/ActionsMapper';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getActions } from '@/store/slices/actions/actionsSlice';
import { actionsEnum } from '@/types/enums/typeEnum';
import { useEffect, useState } from 'react';
import AddAction from './Create/AddAction';

const Actions = () => {
  const dispatch = useAppDispatch();
  const {
    actions: { actions, loading },
  } = useAppSelector((state) => state.actions);

  const [actionModal, setActionModal] = useState<actionsEnum | null>(null);
  const [clickedRowId, setClickedRowId] = useState<string | undefined>(
    undefined
  );

  const { rows, columns } = ActionMappers(actions, clickedRowId);

  useEffect(() => {
    dispatch(getActions());
  }, []);

  const onRowClick = (column: columnRowType, row: columnRowType) => {
    if (row.key === 'user') {
      setClickedRowId(column.invoiceNr);
    }
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
        title='Shto Veprim'
        onClick={() => handleModal(actionsEnum.add)}
        sx={{ marginBottom: 10 }}
      />
      <Table
        columns={columns}
        rows={rows ?? []}
        onRowClick={onRowClick}
        exports={{ excel: true, pdf: true }}
      />
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
