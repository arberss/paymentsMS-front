import { Button, Flex, Modal, Text } from '@mantine/core';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: ConfirmModalProps) => {
  return (
    <Modal
      opened={isOpen}
      size='md'
      onClose={onClose}
      title={title}
      closeOnClickOutside={true}
      centered
    >
      <Text size={16} align='center'>{description}</Text>
      <Flex columnGap={10} sx={{marginTop: 10}}>
        <Button
          sx={{ width: '100%', marginTop: 10, fontSize: 16 }}
          variant='outline'
          color='dark'
          onClick={() => onClose()}
        >
          Anulo
        </Button>
        <Button
          sx={{ width: '100%', marginTop: 10, fontSize: 16 }}
          variant='outline'
          color='blue'
          onClick={() => onConfirm()}
        >
          Konfirmo
        </Button>
      </Flex>
    </Modal>
  );
};

export default ConfirmModal;
