import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

export default function ModalWrapper({ isOpen, onClose, children }) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Configuration Modal</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
