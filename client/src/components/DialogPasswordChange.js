import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import isValidPassword from './authentication';
import { updatePassword } from './Module';

export default function DialogPasswordChange({ id }) {
  const [open, setOpen] = useState(false);
  const [checker, setChecker] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const handleClickOpen = () => {
    setChecker(true);
    setOpen(true);
    setIsValid(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseChange = () => {
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const isNotEqual = oldPassword !== newPassword;
    const oldIsNull = oldPassword !== '';
    const newIsNull = newPassword !== '';
    if (checker && isValid && isNotEqual && newIsNull && oldIsNull) {
      updatePassword(id, newPassword, oldPassword).then((response) => {
        console.log(response);
      });
    }
  };
  return (
    <div>
      <button id="change" style={{ color: '#00695c', border: 'none', backgroundColor: 'inherit' }} type="button" onClick={handleClickOpen}>Change password</button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change password</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="oldPassword"
            label="Old password"
            type="password"
            fullWidth
          />

          <TextField
            error={!isValid}
            autoFocus
            onChange={(event) => {
              setIsValid(isValidPassword(event.target.value));
            }}
            margin="dense"
            id="newPassword"
            label="Input new password"
            type="password"
            fullWidth
            helperText={isValid ? 'Password is strong!' : 'Password needs a min length of 8. It must consist of at 8 ...'}
          />

          <TextField
            error={!checker}
            onChange={(event) => {
              setChecker(event.target.value === document.getElementById('newPassword').value);
            }}
            autoFocus
            margin="dense"
            id="newPasswordConfirmed"
            label="Confirm new password"
            type="password"
            fullWidth
            helperText={checker ? '' : 'New password must be identical'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="#00695c">
            Cancel
          </Button>
          <Button onClick={handleCloseChange} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
