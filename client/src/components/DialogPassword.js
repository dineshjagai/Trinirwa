import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './DialogPassword.css';

export default function DialogPassword() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button id="delete" style={{ color: '#00695c', border: 'none', backgroundColor: 'inherit' }} type="button" onClick={handleClickOpen}>Delete account</button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Confirm account deletion</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="passwordInput"
            label="Input password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <button className="btn cancel" type="button" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn delete" type="button" onClick={handleClose}>
            Delete
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
