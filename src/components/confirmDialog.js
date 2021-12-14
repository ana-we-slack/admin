import { useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAsync } from '../utils/useAsync';
import adminApi from '../api/admin';
import Spinner from './spinner';

export default function AlertDialog({
  openDialog,
  setOpenDialog,
  id,
  run,
  rowPerPage,
}) {
  const { run: deleteRun, status, error } = useAsync();

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, [setOpenDialog]);

  const Delete = useCallback(() => {
    deleteRun(adminApi.deleteAdmin(id));
    run(adminApi.getAdmins({ page_size: rowPerPage }));

    handleCloseDialog();
  }, [deleteRun, id, run, rowPerPage, handleCloseDialog]);

  if (status === 'pending') {
    return <Spinner />;
  } else if (status === 'rejected') {
    throw error;
  }

  return (
    <div>
      <Dialog
        onClose={handleCloseDialog}
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Delete} autoFocus color="error">
            Delete
          </Button>
          <Button onClick={handleCloseDialog} color="success">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
