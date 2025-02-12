import React from 'react';
import { Modal, Box, Fade, Backdrop } from '@mui/material';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const ModelsComponent = ({ children, open, onClose }: ModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,  
            borderRadius: 2,
          }}
        >
          <div>{children}</div>
        </Box>
      </Fade>
    </Modal>
  );
};
