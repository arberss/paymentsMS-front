import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import Loader from '@/components/Loader/Loader';
import NavbarHeader from '@/components/Navbar/NavbarHeader';
import { Actions as TableActions } from '@/components/Table/actions/TableActions';
import Table, { columnRowType, TableProps } from '@/components/Table/Table';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import { endpoints } from '@/config/endpoints';
import { usePutMutation } from '@/hooks/useMutation';
import { usePagination } from '@/hooks/usePagination';
import { ActionMappers, calculateAmountsByYear } from '@/mappers/ActionsMapper';
import { IAction } from '@/types/actions/actions';
import { actionsEnum, typeEnum, typeEnumsAl } from '@/types/enums/typeEnum';
import { IPagination } from '@/types/pagination/pagination';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import GeneralCalculations, {
  Operators,
} from './components/GeneralCalculations';
import AddAction from './create/AddAction';

const Actions = () => {
  const [paginations, setPaginations] = useState({
    page: 1,
    size: 10,
    totalPages: 10,
  });
  const [actionModal, setActionModal] = useState<actionsEnum | null>(null);
  const [clickedRowId, setClickedRowId] = useState<string | undefined>(
    undefined
  );
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const {
    data: actions = {
      data: [],
      pagination: {
        page: 1,
        size: 10,
        totalPages: 10,
      },
    },
    isSuccess,
    isLoading: loading,
    isFetching,
  } = usePagination<{ data: IAction[]; pagination: IPagination }>(
    endpoints.actions,
    { page: paginations.page, size: paginations.size },
    {
      onSuccess: (data: any) => {
        setPaginations(data.pagination);
      },
    }
  );

  const putMutation = usePutMutation(
    endpoints.deleteAction.replace('::actionId', clickedRowId!)
  );

  const { rows, columns, bottomRows } = ActionMappers({
    data: actions.data,
    clickedRowId,
  });

  const tableActions = [
    (): TableActions => ({
      type: 'delete',
      text: 'Delete',
      svgComponent: <IconTrash size={18} color='orangered' />,
      action: (): void => {
        setConfirmModal(true);
      },
    }),
  ];

  const tableOptions: TableProps['options'] = {
    tableTitle: 'Hyrjet dhe daljet ne buxhet',
    actionColumn: {
      frozen: true,
      position: 'left',
    },
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
    setClickedRowId(column._id);
  };

  const handleModal = (value: actionsEnum | null) => {
    setActionModal(value);
  };

  const handleCloseModal = () => {
    handleModal(null);
  };

  const handleDelete = () => {
    putMutation.mutate(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries(endpoints.actions);
          setConfirmModal(false);
        },
      }
    );
  };

  if (loading) {
    return <Loader />;
  }

  const calculatedByYears = calculateAmountsByYear(actions?.data);

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
        actions={tableActions}
        style={{ blockSize: 400 }}
        onOutsideClick={() => {
          setClickedRowId('');
        }}
      />
      <GeneralCalculations
        data={calculatedByYears}
        tableTitle='Te hyrat vjetore ne buxhet'
        types={calculatedByYears?.years}
        typeName={calculatedByYears?.years}
        operator={Operators['+']}
      />
      <GeneralCalculations
        data={bottomRows}
        tableTitle='Bilanci i buxhetit'
        types={typeEnum}
        typeName={typeEnumsAl}
      />
      <AddAction
        title='Shto veprim'
        isOpen={Boolean(actionModal)}
        onClose={handleCloseModal}
        action={actionModal ?? actionsEnum.add}
      />
      {isFetching && <Loader position='absolute' />}
      <ConfirmModal
        isOpen={confirmModal}
        title='A jeni i sigurt qe deshironi ta fshini kete veprim?'
        onClose={() => setConfirmModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Actions;
