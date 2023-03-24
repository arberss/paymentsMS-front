import Loader from '@/components/Loader/Loader';
import { endpoints } from '@/config/endpoints';
import { usePostMutation } from '@/hooks/useMutation';
import Input from '@/shared-components/Form/Input/Input';
import toast from '@/shared-components/toast/toast';
import { StatusActionType } from '@/types/statuses/statuses';
import { Button, Modal } from '@mantine/core';
import { useFormik } from 'formik';
import { useQueryClient } from 'react-query';
import { validationSchema } from './helper';

interface AddStatusProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  action: StatusActionType;
}

interface InitialValuesType {
  _id?: string | null;
  name: string;
}

const initialValues: InitialValuesType = {
  _id: null,
  name: '',
};

const AddStatus = ({ title, isOpen, onClose, action }: AddStatusProps) => {
  const queryClient = useQueryClient();
  const postMutation = usePostMutation(endpoints.addStatus);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      postMutation.mutate(
        { name: values.name },
        {
          onSuccess() {
            queryClient.invalidateQueries(endpoints.statuses);
            formikHelpers.resetForm();
            onClose();
            toast({ title: 'Statusi u shtua me sukses', status: 'success' });
          },
        }
      );
    },
  });

  return (
    <Modal
      opened={isOpen}
      size='lg'
      onClose={onClose}
      title={title}
      closeOnClickOutside={false}
      centered
    >
      <form onSubmit={formik.handleSubmit}>
        <Input
          name='name'
          label='Emri i statusit'
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />

        <Button
          type='submit'
          sx={{ width: '100%', marginTop: 10, fontSize: 16 }}
        >
          {action === StatusActionType.add ? 'Shto' : 'Ndrysho'}
        </Button>
      </form>
      {postMutation.isLoading && <Loader position='absolute' backdrop />}
    </Modal>
  );
};

export default AddStatus;
