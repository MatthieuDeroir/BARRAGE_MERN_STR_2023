import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const BroadcastButton = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleBroadcast = async () => {
    setIsLoading(true);
    // Logique de diffusion
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} disabled={isLoading}>Broadcast</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Broadcast Playlist</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to broadcast the playlist?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleBroadcast} disabled={isLoading}>
            {isLoading ? 'Broadcasting...' : 'Broadcast'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BroadcastButton;
